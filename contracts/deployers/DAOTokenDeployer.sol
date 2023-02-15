// SPDX-License-Identifier: APACHE-2.0
pragma solidity ^0.8.9;

import "../DAOToken.sol";

// A regular ERC20 token with voting power and mintable by the owner
contract DAOTokenDeployer {
    function deployDAOToken(
        string memory _name,
        string memory _symbol,
        address _fundedAddress,
        uint256 _initialSupply
    ) external returns (address) {
        DAOToken daoToken = new DAOToken(
            _name,
            _symbol,
            _fundedAddress,
            _initialSupply
        );

        // Transfer ownership of the token to the sender
        daoToken.transferOwnership(msg.sender);

        return address(daoToken);
    }
}
