// SPDX-License-Identifier: APACHE-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/governance/utils/IVotes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";

import "./interfaces/IDAOProposerDeployer.sol";
import "./interfaces/IDAOGovernorDeployer.sol";
import "./interfaces/IDAOExecutorDeployer.sol";
import "./interfaces/IDAOTokenDeployer.sol";
import "./interfaces/IDAOProposer.sol";

import "./DAOGovernor.sol";

// Define constant for quorum fraction, voting delay, and voting period
uint256 constant DEFAULT_QUORUM_FRACTION = 4;
uint256 constant DEFAULT_VOTING_DELAY = 0;
uint256 constant DEFAULT_VOTING_PERIOD = 600;

contract DAOFactory {
    // Deployer contracts
    IDAOGovernorDeployer public governorDeployer;
    IDAOExecutorDeployer public executorDeployer;
    IDAOTokenDeployer public tokenDeployer;
    IDAOProposerDeployer public proposerDeployer;

    address[] public daos;

    event DAOCreated(
        address dao,
        address token,
        address executor,
        address proposer
    );

    constructor(
        IDAOGovernorDeployer _governorDeployer,
        IDAOExecutorDeployer _executorDeployer,
        IDAOTokenDeployer _tokenDeployer,
        IDAOProposerDeployer _proposerDeployer
    ) {
        governorDeployer = _governorDeployer;
        executorDeployer = _executorDeployer;
        tokenDeployer = _tokenDeployer;
        proposerDeployer = _proposerDeployer;
    }

    function createDAO(
        string memory _daoName,
        string memory _daoImage,
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _tokenInitialSupply
    ) external returns (address) {
        // Deploy proposer
        address proposer = proposerDeployer.deployDAOProposer();

        // Deploy governance token
        address token = tokenDeployer.deployDAOToken(
            _tokenName,
            _tokenSymbol,
            msg.sender,
            _tokenInitialSupply
        );

        // Deploy executor
        TimelockController executor = executorDeployer.deployDAOExecutor(
            address(this)
        );

        // Deploy the DAO governor
        DAOGovernor dao = governorDeployer.deployDAOGovernor(
            _daoName,
            _daoImage,
            IVotes(token),
            executor,
            proposer,
            DEFAULT_QUORUM_FRACTION,
            DEFAULT_VOTING_DELAY,
            DEFAULT_VOTING_PERIOD
        );

        // Set the governor to the proposer
        IDAOProposer(proposer).setGovernor(dao);

        // Transfer ownership of the token to the DAO executor
        Ownable(token).transferOwnership(address(executor));

        // Grant roles for executors to the DAO in DAOExecutor
        executor.grantRole(executor.PROPOSER_ROLE(), address(dao));
        executor.grantRole(executor.EXECUTOR_ROLE(), address(dao));
        executor.renounceRole(executor.PROPOSER_ROLE(), address(this));
        executor.renounceRole(executor.TIMELOCK_ADMIN_ROLE(), address(this));

        // Add the DAO to the array of DAOs
        daos.push(address(dao));

        emit DAOCreated(
            address(dao),
            address(token),
            address(executor),
            address(proposer)
        );

        return address(this);
    }

    // Get a DAO from its index
    function getDAO(uint256 _index) external view returns (address) {
        return daos[_index];
    }

    // Get the number of DAOs
    function getDAOCount() external view returns (uint256) {
        return daos.length;
    }
}
