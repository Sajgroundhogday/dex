// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Token {
    //state variable
    //belongs to entire particular smart-contract not just to function.
    string public name;
    string public symbol = "DAPP";
    uint public decimals = 18;
    uint public totalSupply;

    constructor(string memory _name, string memory _symbol, uint _totalSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply * (10 ** decimals);
    }
}
