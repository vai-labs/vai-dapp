// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title VAI Token
 * @dev ERC20 token for the Value AI ecosystem
 * Includes role-based governance, minting capabilities
 */
contract VAI is ERC20, ERC20Burnable, AccessControl {
    // Role definitions
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    // Events
    event MinterAdded(address indexed account);
    event MinterRemoved(address indexed account);
    
    /**
     * @dev Constructor that initializes the token with name, symbol and assigns roles to the deployer
     */
    constructor() ERC20("Value AI Token", "VAI") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
    }
    
    /**
     * @dev Adds a new minter to the token
     * @param account Address to be granted the minter role
     */
    function addMinter(address account) external onlyRole(ADMIN_ROLE) {
        grantRole(MINTER_ROLE, account);
        emit MinterAdded(account);
    }
    
    /**
     * @dev Removes a minter from the token
     * @param account Address to have the minter role revoked
     */
    function removeMinter(address account) external onlyRole(ADMIN_ROLE) {
        revokeRole(MINTER_ROLE, account);
        emit MinterRemoved(account);
    }
    
    /**
     * @dev Mints new tokens to the specified address
     * @param to Address to receive the minted tokens
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
    
    /**
     * @dev Burns tokens from the sender's balance
     * @param amount Amount of tokens to burn
     */
    function burn(uint256 amount) public override(ERC20Burnable) {
        super.burn(amount);
    }
    
    /**
     * @dev Burns tokens from a specific account (requires allowance)
     * @param account Address to burn tokens from
     * @param amount Amount of tokens to burn
     */
    function burnFrom(address account, uint256 amount) public override(ERC20Burnable) {
        super.burnFrom(account, amount);
    }
}