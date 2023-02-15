// SPDX-License-Identifier: APACHE-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/governance/TimelockController.sol";

interface IDAOExecutorDeployer {
    function deployDAOExecutor(
        address _originalAdmin
    ) external returns (TimelockController);
}
