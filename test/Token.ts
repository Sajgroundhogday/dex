const { expect } = require("chai");
import { ethers } from "hardhat";

let tokens = (eth: string) => {
    return ethers.parseUnits(eth.toString(), "ether");
};
describe("Token contract", function () {
  let token: any;
  beforeEach(async ()=>{
    const Token = await ethers.getContractFactory('Token');
    token = await Token.deploy("DApp University", 'DAPP', 1000000);
  })
  it("has correct name", async () => {
    expect(await token.name()).to.equal('DApp University');
  });

  it("has correct symbol", async () => {
    expect(await token.symbol()).to.equal('DAPP');
  });

  it('has correct decimals', async () => {
    expect(await token.decimals()).to.equal(18);
  })

  it('has correct total supply', async () => {
    const value = tokens('1000000');
    expect(await token.totalSupply()).to.equal(value);
  })
});