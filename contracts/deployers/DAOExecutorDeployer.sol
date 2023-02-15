// SPDX-License-Identifier: APACHE-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/governance/TimelockController.sol";
import "../DAOExecutor.sol";

contract DAOExecutorDeployer {
    function deployDAOExecutor(
        address _originalAdmin
    ) external returns (TimelockController) {
        // Dynamic array conversion
        address[] memory proposers = new address[](1);
        proposers[0] = address(_originalAdmin);

        DAOExecutor daoExecutor = new DAOExecutor(
            proposers,
            new address[](0),
            _originalAdmin
        );
        return TimelockController(daoExecutor);
    }
}
