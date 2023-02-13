// SPDX-License-Identifier: APACHE-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract DAOExecutor is TimelockController {
    constructor(
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) TimelockController(0, proposers, executors, admin) {}
}
