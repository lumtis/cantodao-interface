// SPDX-License-Identifier: APACHE-2.0
pragma solidity ^0.8.9;

import "../DAOGovernor.sol";

interface IDAOProposer {
    function setGovernor(DAOGovernor _governor) external;
}
