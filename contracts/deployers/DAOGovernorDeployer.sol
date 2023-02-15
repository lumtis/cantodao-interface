// SPDX-License-Identifier: APACHE-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/governance/utils/IVotes.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";

import "../DAOGovernor.sol";

contract DAOGovernorDeployer {
    function deployDAOGovernor(
        string memory _daoName,
        string memory _daoImage,
        IVotes _token,
        TimelockController _executor,
        address _proposer,
        uint256 _quorumFraction,
        uint256 _votingDelay,
        uint256 _votingPeriod
    ) external returns (DAOGovernor) {
        // Deploy the DAO governor
        DAOGovernor dao = new DAOGovernor(
            _daoName,
            _daoImage,
            _token,
            _executor,
            _proposer,
            _quorumFraction,
            _votingDelay,
            _votingPeriod
        );

        return DAOGovernor(dao);
    }
}
