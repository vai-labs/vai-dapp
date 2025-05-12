// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./FieldManager.sol";
import "./ReferralManager.sol";

/**
 * @title ProposalManager
 * @dev Manages proposals, voting, and reward distribution
 */
contract ProposalManager is AccessControl {
    using SafeERC20 for IERC20;
    
    // Role definitions
    bytes32 public constant PROPOSAL_ADMIN_ROLE = keccak256("PROPOSAL_ADMIN_ROLE");
    
    // State variables
    IERC20 public vaiToken;
    FieldManager public fieldManager;
    ReferralManager public referralManager;
    uint256 public rewardPool;
    uint256 public constant CREATOR_PERCENTAGE = 10; // 10%
    uint256 public constant REFERRAL_PERCENTAGE = 10; // 10%
    uint256 public constant VOTER_PERCENTAGE = 80; // 80%
    
    // Proposal status enum
    enum ProposalStatus { Active, Completed, Canceled }
    
    // Vote type enum
    enum VoteType { None, For, Against }
    
    // Proposal structure
    struct Proposal {
        uint256 id;
        uint256 fieldId;
        address creator;
        string title;
        string description;
        string metadataURI;
        uint256 minimumTrustScore;
        uint256 startTime;
        uint256 endTime;
        uint256 rewardAmount;
        uint256 totalStaked;
        uint256 votesFor;
        uint256 votesAgainst;
        ProposalStatus status;
        bool rewardsDistributed;
    }
    
    // Vote structure
    struct Vote {
        address voter;
        VoteType voteType;
        uint256 stake;
        uint256 timestamp;
    }
    
    // Mappings for proposal data
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => Vote)) public votes;
    mapping(uint256 => address[]) public proposalVoters;
    
    uint256 private proposalCounter;
    
    // Events
    event ProposalCreated(uint256 indexed proposalId, uint256 indexed fieldId, address indexed creator);
    event VoteCast(uint256 indexed proposalId, address indexed voter, VoteType voteType, uint256 stake);
    event ProposalCompleted(uint256 indexed proposalId, bool passed);
    event ProposalCanceled(uint256 indexed proposalId);
    event RewardsDistributed(uint256 indexed proposalId, uint256 creatorReward, uint256 referralReward, uint256 voterReward);
    event RewardPoolFunded(uint256 amount);
    
    /**
     * @dev Constructor sets the contract dependencies and assigns roles
     * @param _vaiToken Address of the VAI token contract
     * @param _fieldManager Address of the FieldManager contract
     * @param _referralManager Address of the ReferralManager contract
     */
    constructor(address _vaiToken, address _fieldManager, address _referralManager) {
        require(_vaiToken != address(0), "VAI token address cannot be zero");
        require(_fieldManager != address(0), "FieldManager address cannot be zero");
        require(_referralManager != address(0), "ReferralManager address cannot be zero");
        
        vaiToken = IERC20(_vaiToken);
        fieldManager = FieldManager(_fieldManager);
        referralManager = ReferralManager(_referralManager);
        
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(PROPOSAL_ADMIN_ROLE, msg.sender);
    }
    
    /**
     * @dev Fund the reward pool
     * @param amount Amount of VAI tokens to add to the pool
     */
    function fundRewardPool(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        
        // Transfer tokens from sender to contract
        vaiToken.safeTransferFrom(msg.sender, address(this), amount);
        rewardPool += amount;
        
        emit RewardPoolFunded(amount);
    }
    
    /**
     * @dev Create a new proposal
     * @param fieldId Field ID the proposal belongs to
     * @param title Proposal title
     * @param description Proposal description
     * @param metadataURI URI pointing to additional proposal metadata
     * @param minimumTrustScore Minimum trust score required to vote (0-10000)
     * @param durationDays Duration of the voting period in days
     * @param rewardAmount Reward amount for the proposal
     * @return proposalId The ID of the newly created proposal
     */
    function createProposal(
        uint256 fieldId,
        string memory title,
        string memory description,
        string memory metadataURI,
        uint256 minimumTrustScore,
        uint256 durationDays,
        uint256 rewardAmount
    ) external returns (uint256) {
        require(durationDays > 0, "Duration must be greater than zero");
        require(durationDays <= 30, "Duration cannot exceed 30 days");
        require(rewardAmount > 0, "Reward amount must be greater than zero");
        require(rewardPool >= rewardAmount, "Insufficient funds in reward pool");
        require(minimumTrustScore <= fieldManager.MAX_TRUST_SCORE(), "Trust score exceeds maximum");
        require(fieldManager.isStakeholder(fieldId, msg.sender), "Creator must be a stakeholder in the field");
        
        // Check creator's trust score
        uint256 creatorTrustScore = fieldManager.getTrustScore(fieldId, msg.sender);
        require(creatorTrustScore >= minimumTrustScore, "Creator's trust score is too low");
        
        proposalCounter++;
        uint256 proposalId = proposalCounter;
        
        // Initialize the proposal
        Proposal storage newProposal = proposals[proposalId];
        newProposal.id = proposalId;
        newProposal.fieldId = fieldId;
        newProposal.creator = msg.sender;
        newProposal.title = title;
        newProposal.description = description;
        newProposal.metadataURI = metadataURI;
        newProposal.minimumTrustScore = minimumTrustScore;
        newProposal.startTime = block.timestamp;
        newProposal.endTime = block.timestamp + (durationDays * 1 days);
        newProposal.rewardAmount = rewardAmount;
        newProposal.status = ProposalStatus.Active;
        
        // Deduct reward amount from reward pool
        rewardPool -= rewardAmount;
        
        emit ProposalCreated(proposalId, fieldId, msg.sender);
        return proposalId;
    }
    
    /**
     * @dev Cast a vote on a proposal
     * @param proposalId ID of the proposal
     * @param voteType Type of vote (For or Against)
     * @param stakeAmount Amount of VAI tokens to stake on the vote
     */
    function vote(uint256 proposalId, VoteType voteType, uint256 stakeAmount) external {
        require(proposalId <= proposalCounter, "Proposal does not exist");
        Proposal storage proposal = proposals[proposalId];
        
        require(proposal.status == ProposalStatus.Active, "Proposal is not active");
        require(block.timestamp < proposal.endTime, "Voting period has ended");
        require(voteType == VoteType.For || voteType == VoteType.Against, "Invalid vote type");
        require(stakeAmount > 0, "Stake amount must be greater than zero");
        require(votes[proposalId][msg.sender].voteType == VoteType.None, "Already voted on this proposal");
        
        // Check if voter is a stakeholder in the field
        require(fieldManager.isStakeholder(proposal.fieldId, msg.sender), "Must be a stakeholder in the field");
        
        // Check voter's trust score
        uint256 voterTrustScore = fieldManager.getTrustScore(proposal.fieldId, msg.sender);
        require(voterTrustScore >= proposal.minimumTrustScore, "Trust score is too low");
        
        // Transfer stake from voter to contract
        vaiToken.safeTransferFrom(msg.sender, address(this), stakeAmount);
        
        // Record the vote
        votes[proposalId][msg.sender] = Vote({
            voter: msg.sender,
            voteType: voteType,
            stake: stakeAmount,
            timestamp: block.timestamp
        });
        
        proposalVoters[proposalId].push(msg.sender);
        
        // Update proposal vote counts
        proposal.totalStaked += stakeAmount;
        if (voteType == VoteType.For) {
            proposal.votesFor += stakeAmount;
        } else {
            proposal.votesAgainst += stakeAmount;
        }
        
        emit VoteCast(proposalId, msg.sender, voteType, stakeAmount);
    }
    
    /**
     * @dev Complete a proposal after voting period ends
     * @param proposalId ID of the proposal
     */
    function completeProposal(uint256 proposalId) external {
        require(proposalId <= proposalCounter, "Proposal does not exist");
        Proposal storage proposal = proposals[proposalId];
        
        require(proposal.status == ProposalStatus.Active, "Proposal is not active");
        require(block.timestamp >= proposal.endTime, "Voting period has not ended");
        
        bool passed = proposal.votesFor > proposal.votesAgainst;
        proposal.status = ProposalStatus.Completed;
        
        emit ProposalCompleted(proposalId, passed);
        
        // If the proposal passed, distribute rewards
        if (passed && !proposal.rewardsDistributed) {
            distributeRewards(proposalId);
        } else {
            // Return staked tokens to voters if proposal didn't pass
            returnStakes(proposalId);
        }
    }
    
    /**
     * @dev Cancel a proposal (only by creator or admin)
     * @param proposalId ID of the proposal
     */
    function cancelProposal(uint256 proposalId) external {
        require(proposalId <= proposalCounter, "Proposal does not exist");
        Proposal storage proposal = proposals[proposalId];
        
        require(proposal.status == ProposalStatus.Active, "Proposal is not active");
        require(
            msg.sender == proposal.creator || hasRole(PROPOSAL_ADMIN_ROLE, msg.sender),
            "Only creator or admin can cancel"
        );
        
        proposal.status = ProposalStatus.Canceled;
        
        // Return the reward to the pool
        rewardPool += proposal.rewardAmount;
        
        // Return staked tokens to voters
        returnStakes(proposalId);
        
        emit ProposalCanceled(proposalId);
    }
    
    /**
     * @dev Return staked tokens to voters (internal function)
     * @param proposalId ID of the proposal
     */
    function returnStakes(uint256 proposalId) internal {
        address[] memory voters = proposalVoters[proposalId];
        
        for (uint256 i = 0; i < voters.length; i++) {
            address voter = voters[i];
            uint256 stake = votes[proposalId][voter].stake;
            
            if (stake > 0) {
                vaiToken.safeTransfer(voter, stake);
            }
        }
    }
    
    /**
     * @dev Distribute rewards to all stakeholders (internal function)
     * @param proposalId ID of the proposal
     */
    function distributeRewards(uint256 proposalId) internal {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.rewardsDistributed, "Rewards already distributed");
        
        proposal.rewardsDistributed = true;
        
        uint256 totalReward = proposal.rewardAmount;
        
        // Calculate reward shares
        uint256 creatorReward = (totalReward * CREATOR_PERCENTAGE) / 100;
        uint256 referralReward = (totalReward * REFERRAL_PERCENTAGE) / 100;
        uint256 voterReward = totalReward - creatorReward - referralReward;
        
        // Distribute creator reward
        vaiToken.safeTransfer(proposal.creator, creatorReward);
        
        // Distribute referral reward if applicable
        if (referralManager.hasReferrer(proposal.creator)) {
            address referrer = referralManager.getReferrer(proposal.creator);
            vaiToken.safeTransfer(referrer, referralReward);
        } else {
            // If no referrer, add to voter reward
            voterReward += referralReward;
        }
        
        // Distribute voter rewards proportionally to their stakes
        address[] memory voters = proposalVoters[proposalId];
        for (uint256 i = 0; i < voters.length; i++) {
            address voter = voters[i];
            Vote memory userVote = votes[proposalId][voter];
            
            // Only reward "For" votes
            if (userVote.voteType == VoteType.For && userVote.stake > 0) {
                // Calculate proportional reward
                uint256 userReward = (voterReward * userVote.stake) / proposal.votesFor;
                
                // Return stake plus reward
                uint256 totalPayment = userVote.stake + userReward;
                vaiToken.safeTransfer(voter, totalPayment);
            } else if (userVote.voteType == VoteType.Against && userVote.stake > 0) {
                // Return only stake for "Against" votes
                vaiToken.safeTransfer(voter, userVote.stake);
            }
        }
        
        emit RewardsDistributed(proposalId, creatorReward, referralReward, voterReward);
    }
    
    /**
     * @dev Get proposal details
     * @param proposalId ID of the proposal
     * @return All proposal fields
     */
    function getProposalDetails(uint256 proposalId) external view returns (
        uint256 id,
        uint256 fieldId,
        address creator,
        string memory title,
        string memory description,
        string memory metadataURI,
        uint256 minimumTrustScore,
        uint256 startTime,
        uint256 endTime,
        uint256 rewardAmount,
        uint256 totalStaked,
        uint256 votesFor,
        uint256 votesAgainst,
        ProposalStatus status,
        bool rewardsDistributed
    ) {
        require(proposalId <= proposalCounter, "Proposal does not exist");
        Proposal storage proposal = proposals[proposalId];
        
        return (
            proposal.id,
            proposal.fieldId,
            proposal.creator,
            proposal.title,
            proposal.description,
            proposal.metadataURI,
            proposal.minimumTrustScore,
            proposal.startTime,
            proposal.endTime,
            proposal.rewardAmount,
            proposal.totalStaked,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.status,
            proposal.rewardsDistributed
        );
    }
    
    /**
     * @dev Get details of a user's vote on a proposal
     * @param proposalId ID of the proposal
     * @param voter Address of the voter
     * @return voteType, stake, and timestamp
     */
    function getUserVote(uint256 proposalId, address voter) external view returns (
        VoteType voteType,
        uint256 stake,
        uint256 timestamp
    ) {
        Vote memory userVote = votes[proposalId][voter];
        return (userVote.voteType, userVote.stake, userVote.timestamp);
    }
    
    /**
     * @dev Get all voters for a proposal
     * @param proposalId ID of the proposal
     * @return Array of voter addresses
     */
    function getProposalVoters(uint256 proposalId) external view returns (address[] memory) {
        return proposalVoters[proposalId];
    }
    
    /**
     * @dev Get the total number of proposals
     * @return count The number of proposals
     */
    function getProposalCount() external view returns (uint256) {
        return proposalCounter;
    }
}