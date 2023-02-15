// SPDX-License-Identifier: APACHE-2.0
pragma solidity ^0.8.9;

import "./DAOGovernor.sol";

// DAOProposer is a simple permissionless proposer contract for DAOGovernor that stores proposal on-chain
contract DAOProposer {
    struct ProposalContent {
        address[] targets;
        uint256[] values;
        bytes[] calldatas;
        string description;
    }

    // Address of the DAO governor
    DAOGovernor public daoGovernor;

    uint256 public proposalCount = 0;
    mapping(uint256 => uint256) public proposalIDs;
    mapping(uint256 => ProposalContent) public proposalContents;

    // set the DAO governor address
    function setGovernor(DAOGovernor _governor) external {
        // check the address is not initialized
        require(
            address(daoGovernor) == address(0),
            "DAOProposer: DAO governor address is already initialized"
        );

        daoGovernor = _governor;
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

    // propose add more onchain logic and storage for UX purposes
    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    ) public returns (uint256) {
        uint256 proposalID = daoGovernor.propose(
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
}
