// SPDX-License-Identifier: APACHE-2.0
pragma solidity ^0.8.9;

interface IDAOTokenDeployer {
    function deployDAOToken(
        string memory _name,
        string memory _symbol,
        address _fundedAddress,
        uint256 _initialSupply
    ) external returns (address);
}
