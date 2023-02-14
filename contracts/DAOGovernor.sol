// SPDX-License-Identifier: APACHE-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

import "./DAOExecutor.sol";

// An implementation of governance for DAOs
contract DAOGovernor is
    Governor,
    GovernorCompatibilityBravo,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl
{
    struct ProposalContent {
        address[] targets;
        uint256[] values;
        bytes[] calldatas;
        string description;
    }

    // DAO parameters
    uint256 private _votingDelay_;
    uint256 private _votingPeriod_;
    uint256 private _proposalThreshold_;

    // DAO data
    string public imageURL;

    // Theses values are not part of the contract template
    // These add more on-chain data and causes the contract interaction to be more expensive
    // The benefit is that no off-chain infrastructure is required to display the data
    uint256 public proposalCount = 0;
    mapping(uint256 => uint256) public proposalIDs;
    mapping(uint256 => ProposalContent) public proposalContents;

    constructor(
        string memory _name,
        string memory _imageURL,
        IVotes _token,
        TimelockController _timelock,
        uint256 _quorumFraction,
        uint256 _votingDelay,
        uint256 _votingPeriod,
        uint256 _proposalThreshold
    )
        Governor(_name)
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(_quorumFraction)
        GovernorTimelockControl(_timelock)
    {
        _votingDelay_ = _votingDelay;
        _votingPeriod_ = _votingPeriod;
        _proposalThreshold_ = _proposalThreshold;
        imageURL = _imageURL;
    }

    function getProposalContent(
        uint256 id
    )
        public
        view
        returns (
            address[] memory,
            uint256[] memory,
            bytes[] memory,
            string memory
        )
    {
        return (
            proposalContents[id].targets,
            proposalContents[id].values,
            proposalContents[id].calldatas,
            proposalContents[id].description
        );
    }

    function votingDelay() public view override returns (uint256) {
        return _votingDelay_;
    }

    function votingPeriod() public view override returns (uint256) {
        return _votingPeriod_;
    }

    function proposalThreshold() public view override returns (uint256) {
        return _proposalThreshold_;
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
        returns (uint256)
    {
        uint256 proposalID = super.propose(
            targets,
            values,
            calldatas,
            description
        );

        // Store the new proposal content
        proposalIDs[proposalCount] = proposalID;
        proposalContents[proposalID] = ProposalContent(
            targets,
            values,
            calldatas,
            description
        );
        proposalCount++;

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
