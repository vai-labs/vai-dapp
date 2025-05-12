// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title FieldManager
 * @dev Manages Fields (domains/topics) and user trust scores within each Field
 */
contract FieldManager is AccessControl {
    using SafeERC20 for IERC20;
    
    // Role definitions
    bytes32 public constant FIELD_ADMIN_ROLE = keccak256("FIELD_ADMIN_ROLE");
    
    // State variables
    IERC20 public vaiToken;
    uint256 public constant MINIMUM_STAKE = 1000 * 10**18; // 1,000 VAI tokens (with 18 decimals)
    uint256 public constant MAX_TRUST_SCORE = 10000; // Maximum trust score value
    
    // Field structure
    struct Field {
        uint256 id;
        string name;
        string description;
        string metadataURI;
        mapping(address => uint256) stakes;
        mapping(address => uint256) trustScores;
        address[] stakeholders;
        bool exists;
    }
    
    // Stakeholder structure to track user's stake in each field
    struct Stake {
        uint256 amount;
        uint256 timestamp;
    }
    
    // Mappings for field data
    mapping(uint256 => Field) private fields;
    mapping(string => uint256) private fieldNameToId;
    uint256 private fieldCounter;
    
    // Events
    event FieldCreated(uint256 indexed fieldId, string name, string description);
    event UserStaked(uint256 indexed fieldId, address indexed user, uint256 amount);
    event UserUnstaked(uint256 indexed fieldId, address indexed user, uint256 amount);
    event TrustScoreUpdated(uint256 indexed fieldId, address indexed user, uint256 score);
    
    /**
     * @dev Constructor sets the VAI token address and assigns roles
     * @param _vaiToken Address of the VAI token contract
     */
    constructor(address _vaiToken) {
        require(_vaiToken != address(0), "VAI token address cannot be zero");
        vaiToken = IERC20(_vaiToken);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(FIELD_ADMIN_ROLE, msg.sender);
    }
    
    /**
     * @dev Create a new Field
     * @param name Name of the Field
     * @param description Short description of the Field
     * @param metadataURI URI pointing to additional Field metadata
     * @return fieldId The ID of the newly created Field
     */
    function createField(string memory name, string memory description, string memory metadataURI) 
        external onlyRole(FIELD_ADMIN_ROLE) returns (uint256) 
    {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(fieldNameToId[name] == 0, "Field name already exists");
        
        fieldCounter++;
        uint256 fieldId = fieldCounter;
        
        Field storage newField = fields[fieldId];
        newField.id = fieldId;
        newField.name = name;
        newField.description = description;
        newField.metadataURI = metadataURI;
        newField.exists = true;
        
        fieldNameToId[name] = fieldId;
        
        emit FieldCreated(fieldId, name, description);
        return fieldId;
    }
    
    /**
     * @dev Stake VAI tokens in a Field
     * @param fieldId ID of the Field
     * @param amount Amount of VAI tokens to stake
     */
    function stakeInField(uint256 fieldId, uint256 amount) external {
        require(amount > 0, "Stake amount must be greater than zero");
        require(fields[fieldId].exists, "Field does not exist");
        
        Field storage field = fields[fieldId];
        
        // Check if this is a new stake or additional stake
        bool isNewStakeholder = field.stakes[msg.sender] == 0;
        
        // Check if new stake meets minimum requirement
        if (isNewStakeholder) {
            require(amount >= MINIMUM_STAKE, "Stake amount is below minimum required");
            field.stakeholders.push(msg.sender);
            // New stakeholders start with a neutral trust score
            field.trustScores[msg.sender] = 5000; // 50% of MAX_TRUST_SCORE
        }
        
        // Transfer tokens to contract
        vaiToken.safeTransferFrom(msg.sender, address(this), amount);
        
        // Update stake
        field.stakes[msg.sender] += amount;
        
        emit UserStaked(fieldId, msg.sender, amount);
    }
    
    /**
     * @dev Unstake VAI tokens from a Field
     * @param fieldId ID of the Field
     * @param amount Amount of VAI tokens to unstake
     */
    function unstakeFromField(uint256 fieldId, uint256 amount) external {
        require(amount > 0, "Unstake amount must be greater than zero");
        require(fields[fieldId].exists, "Field does not exist");
        
        Field storage field = fields[fieldId];
        require(field.stakes[msg.sender] >= amount, "Insufficient staked amount");
        
        // Update stake
        field.stakes[msg.sender] -= amount;
        
        // If completely unstaked, remove from stakeholders array
        if (field.stakes[msg.sender] == 0) {
            // Find and remove from stakeholders array
            for (uint256 i = 0; i < field.stakeholders.length; i++) {
                if (field.stakeholders[i] == msg.sender) {
                    field.stakeholders[i] = field.stakeholders[field.stakeholders.length - 1];
                    field.stakeholders.pop();
                    break;
                }
            }
        }
        
        // Transfer tokens back to user
        vaiToken.safeTransfer(msg.sender, amount);
        
        emit UserUnstaked(fieldId, msg.sender, amount);
    }
    
    /**
     * @dev Update a user's trust score in a Field
     * @param fieldId ID of the Field
     * @param user Address of the user
     * @param score New trust score (0-10000)
     */
    function updateTrustScore(uint256 fieldId, address user, uint256 score) 
        external onlyRole(FIELD_ADMIN_ROLE) 
    {
        require(fields[fieldId].exists, "Field does not exist");
        require(score <= MAX_TRUST_SCORE, "Score exceeds maximum");
        require(fields[fieldId].stakes[user] > 0, "User has no stake in this field");
        
        fields[fieldId].trustScores[user] = score;
        
        emit TrustScoreUpdated(fieldId, user, score);
    }
    
    /**
     * @dev Check if a user has staked in a Field
     * @param fieldId ID of the Field
     * @param user Address of the user
     * @return bool whether the user has staked
     */
    function isStakeholder(uint256 fieldId, address user) external view returns (bool) {
        require(fields[fieldId].exists, "Field does not exist");
        return fields[fieldId].stakes[user] > 0;
    }
    
    /**
     * @dev Get a user's stake in a Field
     * @param fieldId ID of the Field
     * @param user Address of the user
     * @return amount of tokens staked
     */
    function getStake(uint256 fieldId, address user) external view returns (uint256) {
        require(fields[fieldId].exists, "Field does not exist");
        return fields[fieldId].stakes[user];
    }
    
    /**
     * @dev Get a user's trust score in a Field
     * @param fieldId ID of the Field
     * @param user Address of the user
     * @return score trust score value
     */
    function getTrustScore(uint256 fieldId, address user) external view returns (uint256) {
        require(fields[fieldId].exists, "Field does not exist");
        return fields[fieldId].trustScores[user];
    }
    
    /**
     * @dev Get all stakeholders in a Field
     * @param fieldId ID of the Field
     * @return addresses Array of stakeholder addresses
     */
    function getStakeholders(uint256 fieldId) external view returns (address[] memory) {
        require(fields[fieldId].exists, "Field does not exist");
        return fields[fieldId].stakeholders;
    }
    
    /**
     * @dev Get Field details
     * @param fieldId ID of the Field
     * @return name Field name
     * @return description Field description
     * @return metadataURI Field metadata URI
     * @return stakeholderCount Number of stakeholders
     */
    function getFieldDetails(uint256 fieldId) external view returns (
        string memory name,
        string memory description,
        string memory metadataURI,
        uint256 stakeholderCount
    ) {
        require(fields[fieldId].exists, "Field does not exist");
        Field storage field = fields[fieldId];
        return (
            field.name,
            field.description,
            field.metadataURI,
            field.stakeholders.length
        );
    }
    
    /**
     * @dev Get Field ID by name
     * @param name Name of the Field
     * @return fieldId The ID of the Field
     */
    function getFieldIdByName(string memory name) external view returns (uint256) {
        uint256 fieldId = fieldNameToId[name];
        require(fieldId != 0, "Field not found");
        return fieldId;
    }
    
    /**
     * @dev Get the total number of Fields
     * @return count The number of Fields
     */
    function getFieldCount() external view returns (uint256) {
        return fieldCounter;
    }
}