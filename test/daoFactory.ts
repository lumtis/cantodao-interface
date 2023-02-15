import { expect } from "chai";
import { ethers } from "hardhat";

import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

const daoName = "Test DAO";
const imageURL = "https://i.imgur.com/J2Awq0y.png";
const tokenName = "Test Token";
const tokenSymbol = "TT";
const tokenSupply = 10000;

describe("DAOFactory", function () {
  const deployDeployersFixture = async () => {
    const [owner] = await ethers.getSigners();

    const DAOGovernorDeployer = await ethers.getContractFactory(
      "DAOGovernorDeployer"
    );
    const daoGovernorDeployer = await DAOGovernorDeployer.deploy();
    await daoGovernorDeployer.deployed();

    // Token
    const DAOTokenDeployer = await ethers.getContractFactory(
      "DAOTokenDeployer"
    );
    const daoTokenDeployer = await DAOTokenDeployer.deploy();
    await daoTokenDeployer.deployed();

    // Executor
    const DAOExecutorDeployer = await ethers.getContractFactory(
      "DAOExecutorDeployer"
    );
    const daoExecutorDeployer = await DAOExecutorDeployer.deploy();
    await daoExecutorDeployer.deployed();

    // Proposer
    const DAOProposerDeployer = await ethers.getContractFactory(
      "DAOProposerDeployer"
    );
    const daoProposerDeployer = await DAOProposerDeployer.deploy();
    await daoProposerDeployer.deployed();

    return {
      owner,
      daoGovernorDeployer,
      daoTokenDeployer,
      daoProposerDeployer,
      daoExecutorDeployer,
    };
  };

  it("Should deploy DAOFactory", async function () {
    const {
      owner,
      daoGovernorDeployer,
      daoExecutorDeployer,
      daoTokenDeployer,
      daoProposerDeployer,
    } = await loadFixture(deployDeployersFixture);

    // Factory
    const DAOFactory = await ethers.getContractFactory("DAOFactory");
    const daoFactory = await DAOFactory.deploy(
      daoGovernorDeployer.address,
      daoExecutorDeployer.address,
      daoTokenDeployer.address,
      daoProposerDeployer.address
    );
    await daoFactory.deployed();

    expect(await daoFactory.governorDeployer()).to.equal(
      daoGovernorDeployer.address
    );
    expect(await daoFactory.tokenDeployer()).to.equal(daoTokenDeployer.address);
    expect(await daoFactory.executorDeployer()).to.equal(
      daoExecutorDeployer.address
    );
    expect(await daoFactory.proposerDeployer()).to.equal(
      daoProposerDeployer.address
    );
  });

  it("Should allow creating DAOs", async function () {
    const {
      owner,
      daoGovernorDeployer,
      daoExecutorDeployer,
      daoTokenDeployer,
      daoProposerDeployer,
    } = await loadFixture(deployDeployersFixture);

    // Factory
    const DAOFactory = await ethers.getContractFactory("DAOFactory");
    const daoFactory = await DAOFactory.deploy(
      daoGovernorDeployer.address,
      daoExecutorDeployer.address,
      daoTokenDeployer.address,
      daoProposerDeployer.address
    );
    await daoFactory.deployed();

    // Check there is no DAO
    expect(await daoFactory.getDAOCount()).to.equal(0);

    const tx = await daoFactory.createDAO(
      daoName,
      imageURL,
      tokenName,
      tokenSymbol,
      tokenSupply
    );
    // Get the DAO address from the event
    // const receipt = await tx.wait();
    // console.log(receipt);

    // Check there DAO is created
    expect(await daoFactory.getDAOCount()).to.equal(1);

    const daoAddress = await daoFactory.getDAO(0);

    // Get dao governor contract with address and check values
    const DAOGovernor = await ethers.getContractFactory("DAOGovernor");
    const daoGovernor = await DAOGovernor.attach(daoAddress);
    expect(await daoGovernor.name()).to.equal(daoName);
    expect(await daoGovernor.imageURL()).to.equal(imageURL);

    // Get dao proposer contract with address and check values
    const daoProposerAddress = await daoGovernor.proposer();
    const DAOProposer = await ethers.getContractFactory("DAOProposer");
    const daoProposer = await DAOProposer.attach(daoProposerAddress);
    expect(await daoProposer.daoGovernor()).to.equal(daoAddress);
    expect(await daoGovernor.proposer()).to.equal(daoProposerAddress);

    // Get dao executor contract with address and check values
    const daoExecutorAddress = await daoGovernor.timelock();
    const DAOExecutor = await ethers.getContractFactory("DAOExecutor");
    const daoExecutor = await DAOExecutor.attach(daoExecutorAddress);
    daoExecutor.hasRole(await daoExecutor.PROPOSER_ROLE(), daoProposerAddress);
    expect(
      await daoExecutor.hasRole(await daoExecutor.PROPOSER_ROLE(), daoAddress)
    ).to.equal(true);
    expect(
      await daoExecutor.hasRole(await daoExecutor.EXECUTOR_ROLE(), daoAddress)
    ).to.equal(true);
    expect(
      await daoExecutor.hasRole(
        await daoExecutor.PROPOSER_ROLE(),
        daoFactory.address
      )
    ).to.equal(false);
    expect(
      await daoExecutor.hasRole(
        await daoExecutor.EXECUTOR_ROLE(),
        daoFactory.address
      )
    ).to.equal(false);
    expect(
      await daoExecutor.hasRole(
        await daoExecutor.TIMELOCK_ADMIN_ROLE(),
        daoFactory.address
      )
    ).to.equal(false);

    // Get dao token contract with address and check values
    const daoTokenAddress = await daoGovernor.token();
    const DAOToken = await ethers.getContractFactory("DAOToken");
    const daoToken = await DAOToken.attach(daoTokenAddress);
    expect(await daoToken.name()).to.equal(tokenName);
    expect(await daoToken.symbol()).to.equal(tokenSymbol);
    expect(await daoToken.totalSupply()).to.equal(tokenSupply);
    expect(await daoToken.owner()).to.equal(daoExecutorAddress);
  });
});
