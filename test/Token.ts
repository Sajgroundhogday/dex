const { expect } = require("chai");
import { ethers } from "hardhat";

let tokens = (eth: string) => {
    return ethers.parseUnits(eth.toString(), "ether");
};
describe("Token contract", function () {
  let token: any;
  let deployer: any;
  let accounts: any;
  beforeEach(async ()=>{
    const Token = await ethers.getContractFactory('Token');
    token = await Token.deploy("DApp University", 'DAPP', 1000000);

    let accounts = await ethers.getSigners();
    console.log(accounts);
    deployer = accounts[0];
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
  
});