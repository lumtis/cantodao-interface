// SPDX-License-Identifier: APACHE-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

// An implementation of governance for DAOs
contract DAOGovernor is
    Governor,
    GovernorCompatibilityBravo,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl
{
    address public proposer;

    // DAO parameters
    uint256 private _votingDelay_;
    uint256 private _votingPeriod_;

    // DAO data
    string public imageURL;

    constructor(
        string memory _name,
        string memory _imageURL,
        IVotes _token,
        TimelockController _timelock,
        address _proposer,
        uint256 _quorumFraction,
        uint256 _votingDelay,
        uint256 _votingPeriod
    )
        Governor(_name)
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(_quorumFraction)
        GovernorTimelockControl(_timelock)
    {
        _votingDelay_ = _votingDelay;
        _votingPeriod_ = _votingPeriod;
        imageURL = _imageURL;
        proposer = _proposer;
    }

    modifier onlyProposer() {
        require(
            msg.sender == proposer,
            "Only the proposer contract can execute this method"
        );
        _;
    }

    function votingDelay() public view override returns (uint256) {
        return _votingDelay_;
    }

    function votingPeriod() public view override returns (uint256) {
        return _votingPeriod_;
    }

    // Proposal condition is controlled by the proposer contract
    function proposalThreshold() public pure override returns (uint256) {
        return 0;
    }

    // propose add more onchain logic and storage for UX purposes
    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    )
        public
        override(Governor, GovernorCompatibilityBravo, IGovernor)
        onlyProposer
        returns (uint256)
    {
        uint256 proposalID = super.propose(
            targets,
            values,
            calldatas,
            description
        );

        return proposalID;
    }

    // The functions below are overrides required by Solidity
    function state(
        uint256 proposalId
    )
        public
        view
        override(Governor, IGovernor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }

    function _execute(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) {
        super._execute(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor()
        internal
        view
        override(Governor, GovernorTimelockControl)
        returns (address)
    {
        return super._executor();
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(Governor, IERC165, GovernorTimelockControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
