// SPDX-License-Identifier: APACHE-2.0
pragma solidity ^0.8.9;

import "../DAOProposer.sol";

contract DAOProposerDeployer {
    function deployDAOProposer() external returns (address) {
        DAOProposer daoProposer = new DAOProposer();
        return address(daoProposer);
    }
}
