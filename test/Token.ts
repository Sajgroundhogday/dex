const { expect } = require("chai");
import { ethers } from "hardhat";

let tokens = (eth: string) => {
    return ethers.parseUnits(eth.toString(), "ether");
};
describe("Token contract", function () {
  let token: any;
  let deployer: any;
  let receiver: any;
  let accounts: any;
  beforeEach(async ()=>{
    const Token = await ethers.getContractFactory('Token');
    token = await Token.deploy("DApp University", 'DAPP', 1000000);

    let accounts = await ethers.getSigners();
    deployer = accounts[0];
    receiver = accounts[1];
  })
  describe('Deployment', ()=> {
    const name = 'DApp University';
    const symbol = 'DAPP';
    const decimals = 18;
    const totalSupply = tokens('1000000');

    it("has correct name", async () => {
      expect(await token.name()).to.equal(name);
    });
  
    it("has correct symbol", async () => {
      expect(await token.symbol()).to.equal(symbol);
    });
  
    it('has correct decimals', async () => {
      expect(await token.decimals()).to.equal(decimals);
    })
  
    it('has correct total supply', async () => {
      expect(await token.totalSupply()).to.equal(totalSupply);
    })

    it('assigns total supply to deployer', async () => {
      expect(await token.balanceOf(deployer.address)).to.equal(totalSupply);
    })
  });

  describe('Sending tokens', () => {
    let transaction: any;
    let result: any;
    describe('Success', () => {
      beforeEach(async () => {
        transaction = await token.connect(deployer).transfer(receiver.address , tokens('100'));
        result = await transaction.wait();
      })
      it("transfer token balances", async () => {
        //transfer tokens
        expect(await token.balanceOf(deployer.address)).to.equal(tokens('999900'));
        expect(await token.balanceOf(receiver.address)).to.equal(tokens('100'));
      })
    })
    describe('Failure', () => {
      it('rejects insufficient balances', async () => {
        let invalidAmount = tokens('10000000000000');
        await expect(token.connect(deployer).transfer(receiver.address , invalidAmount)).to.be.reverted;
      })
    })
    
  })
});