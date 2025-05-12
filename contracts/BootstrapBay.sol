// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./ReferralManager.sol";
import "./VAI.sol";

/**
 * @title BootstrapBay
 * @dev Initial funding mechanism for the VAI ecosystem with referral rewards
 */
contract BootstrapBay is Ownable {
    using SafeERC20 for IERC20;
    
    // State variables
    VAI public vaiToken;
    ReferralManager public referralManager;
    IERC20 public usdtToken; // USDT token for bootstrap contributions
    
    uint256 public constant BOOTSTRAP_AMOUNT = 10 * 10**18; // 10 USDT (with 18 decimals)
    uint256 public constant MIN_REFERRALS_FOR_REWARDS = 100; // Minimum referrals to qualify for rewards
    uint256 public constant REWARD_PER_REFERRAL = 1000 * 10**18; // 1,000 USDT per qualified referral
    
    uint256 public totalBootstrapPool;
    uint256 public rewardPool;
    uint256 public totalParticipants;
    
    // Mapping of participant data
    mapping(address => bool) public hasParticipated;
    mapping(address => uint256) public referralCount;
    mapping(address => bool) public hasClaimedReward;
    
    // Events
    event BootstrapContribution(address indexed contributor, uint256 amount);
    event ReferralRegistered(address indexed referrer, address indexed referred);
    event RewardClaimed(address indexed claimer, uint256 amount);
    event RewardPoolFunded(uint256 amount);
    
    /**
     * @dev Constructor sets contract dependencies
     * @param _vaiToken Address of the VAI token contract
     * @param _referralManager Address of the ReferralManager contract
     * @param _usdtToken Address of the USDT token contract
     */
    constructor(address _vaiToken, address _referralManager, address _usdtToken) {
        require(_vaiToken != address(0), "VAI token address cannot be zero");
        require(_referralManager != address(0), "ReferralManager address cannot be zero");
        require(_usdtToken != address(0), "USDT token address cannot be zero");
        
        vaiToken = VAI(_vaiToken);
        referralManager = ReferralManager(_referralManager);
        usdtToken = IERC20(_usdtToken);
    }
    
    /**
     * @dev Fund the reward pool with USDT
     * @param amount Amount of USDT to add to the pool
     */
    function fundRewardPool(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        
        // Transfer USDT from sender to contract
        usdtToken.safeTransferFrom(msg.sender, address(this), amount);
        rewardPool += amount;
        
        emit RewardPoolFunded(amount);
    }
    
    /**
     * @dev Make a bootstrap contribution and receive VAI tokens
     * @param referrer Address of the referrer (optional, use address(0) for no referrer)
     */
    function contribute(address referrer) external {
        require(!hasParticipated[msg.sender], "Already participated in bootstrap");
        require(msg.sender != referrer, "Cannot refer yourself");
        
        // Transfer USDT from user to contract
        usdtToken.safeTransferFrom(msg.sender, address(this), BOOTSTRAP_AMOUNT);
        
        // Mint equivalent VAI tokens for the user
        vaiToken.mint(msg.sender, BOOTSTRAP_AMOUNT);
        
        // Mark as participated
        hasParticipated[msg.sender] = true;
        totalParticipants++;
        totalBootstrapPool += BOOTSTRAP_AMOUNT;
        
        // Register referral if provided
        if (referrer != address(0) && hasParticipated[referrer]) {
            referralManager.registerReferral(msg.sender, referrer);
            referralCount[referrer]++;
            emit ReferralRegistered(referrer, msg.sender);
        }
        
        emit BootstrapContribution(msg.sender, BOOTSTRAP_AMOUNT);
    }
    
    /**
     * @dev Claim referral rewards for qualified referrers
     */
    function claimReferralReward() external {
        require(hasParticipated[msg.sender], "Must be a bootstrap participant");
        require(!hasClaimedReward[msg.sender], "Already claimed reward");
        require(referralCount[msg.sender] >= MIN_REFERRALS_FOR_REWARDS, "Not enough referrals to qualify");
        
        uint256 rewardAmount = REWARD_PER_REFERRAL * referralCount[msg.sender];
        require(rewardPool >= rewardAmount, "Insufficient funds in reward pool");
        
        // Mark as claimed
        hasClaimedReward[msg.sender] = true;
        
        // Reduce reward pool
        rewardPool -= rewardAmount;
        
        // Transfer USDT rewards to referrer
        usdtToken.safeTransfer(msg.sender, rewardAmount);
        
        emit RewardClaimed(msg.sender, rewardAmount);
    }
    
    /**
     * @dev Check if an address has participated in bootstrap
     * @param account Address to check
     * @return whether the account has participated
     */
    function hasBootstrapped(address account) external view returns (bool) {
        return hasParticipated[account];
    }
    
    /**
     * @dev Get number of referrals for an address
     * @param referrer Address to check
     * @return referral count
     */
    function getReferralCount(address referrer) external view returns (uint256) {
        return referralCount[referrer];
    }
    
    /**
     * @dev Check if an address qualifies for referral rewards
     * @param referrer Address to check
     * @return whether the referrer qualifies
     */
    function qualifiesForReward(address referrer) external view returns (bool) {
        return referralCount[referrer] >= MIN_REFERRALS_FOR_REWARDS;
    }
    
    /**
     * @dev Get potential reward amount for an address
     * @param referrer Address to check
     * @return potential reward amount
     */
    function getPotentialReward(address referrer) external view returns (uint256) {
        if (referralCount[referrer] >= MIN_REFERRALS_FOR_REWARDS && !hasClaimedReward[referrer]) {
            return REWARD_PER_REFERRAL * referralCount[referrer];
        }
        return 0;
    }
}