import { expect } from "chai";
import { ethers } from "hardhat";

describe("DAO Token", () => {
  it("Should be instantiated with the correct name, symbol and total supply minted to sender", async () => {
    const [owner] = await ethers.getSigners();
    
    // Deploy the contract
    const DAOToken = await ethers.getContractFactory("DAOToken");
    const daoToken = await DAOToken.deploy("foo", "FOO", 10000);
    await daoToken.deployed();

    // Values
    expect(await daoToken.name()).to.equal("foo");
    expect(await daoToken.symbol()).to.equal("FOO");
    expect(await daoToken.totalSupply()).to.equal(10000);

    // Supply is minted to the owner
    expect(await daoToken.balanceOf(owner.address)).to.equal(10000);
  });
});
