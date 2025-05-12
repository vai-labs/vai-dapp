// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title ReferralManager
 * @dev Manages referral relationships and reward distributions
 */
contract ReferralManager is Ownable {
    using SafeERC20 for IERC20;
    
    // State variables
    IERC20 public vaiToken;
    uint256 public referralRewardPool;
    uint256 public constant REFERRAL_PERCENTAGE = 10; // 10%
    
    // Mapping to track referral relationships
    mapping(address => address) public referrers;
    
    // Events
    event ReferralRegistered(address indexed referred, address indexed referrer);
    event ReferralRewardDistributed(address indexed recipient, uint256 amount);
    event ReferralPoolFunded(uint256 amount);
    
    /**
     * @dev Constructor sets the VAI token address
     * @param _vaiToken Address of the VAI token contract
     */
    constructor(address _vaiToken) {
        require(_vaiToken != address(0), "VAI token address cannot be zero");
        vaiToken = IERC20(_vaiToken);
    }
    
    /**
     * @dev Register a referral relationship
     * @param newUser Address of the new user being referred
     * @param referrer Address of the referrer
     */
    function registerReferral(address newUser, address referrer) external onlyOwner {
        require(newUser != address(0), "New user address cannot be zero");
        require(referrer != address(0), "Referrer address cannot be zero");
        require(newUser != referrer, "Cannot refer yourself");
        require(referrers[newUser] == address(0), "User already has a referrer");
        
        referrers[newUser] = referrer;
        emit ReferralRegistered(newUser, referrer);
    }
    
    /**
     * @dev Fund the referral reward pool
     * @param amount Amount of VAI tokens to add to the pool
     */
    function fundReferralPool(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        
        // Transfer tokens from sender to contract
        vaiToken.safeTransferFrom(msg.sender, address(this), amount);
        referralRewardPool += amount;
        
        emit ReferralPoolFunded(amount);
    }
    
    /**
     * @dev Distribute referral rewards
     * @param recipient Address to receive the reward
     * @param baseAmount Base amount from which to calculate the referral reward
     * @return rewardAmount The amount of rewards distributed
     */
    function distributeReferralReward(address recipient, uint256 baseAmount) external onlyOwner returns (uint256) {
        require(recipient != address(0), "Recipient address cannot be zero");
        
        address referrer = referrers[recipient];
        if (referrer == address(0)) {
            return 0; // No referrer, no reward
        }
        
        uint256 rewardAmount = (baseAmount * REFERRAL_PERCENTAGE) / 100;
        require(referralRewardPool >= rewardAmount, "Insufficient funds in referral pool");
        
        referralRewardPool -= rewardAmount;
        vaiToken.safeTransfer(referrer, rewardAmount);
        
        emit ReferralRewardDistributed(referrer, rewardAmount);
        return rewardAmount;
    }
    
    /**
     * @dev Check if an address has a referrer
     * @param user Address to check
     * @return whether the user has a referrer
     */
    function hasReferrer(address user) external view returns (bool) {
        return referrers[user] != address(0);
    }
    
    /**
     * @dev Get the referrer of a user
     * @param user Address to check
     * @return referrer address
     */
    function getReferrer(address user) external view returns (address) {
        return referrers[user];
    }
}