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

    //mappings
    mapping(address => uint) public balanceOf;


    //events
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value 
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    constructor(string memory _name, string memory _symbol, uint _totalSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply * (10 ** decimals);
        balanceOf[msg.sender] = totalSupply;
    }
    
    function transfer(address _to, uint _value) public returns (bool success) {
        
        require(balanceOf[msg.sender] >= _value);
        require(_to != address(0));
        
        //deduct the token from spender.
        balanceOf[msg.sender] -=  _value;
        //credit to receiver.
        balanceOf[_to] += _value;

        //emit transfer event
        emit Transfer(msg.sender, _to , _value);
        return true;
    }
}
