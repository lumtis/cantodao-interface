import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

import { loadFixture, mine } from "@nomicfoundation/hardhat-network-helpers";

import { DAOProposer } from "../typechain-types/contracts/DAOProposer";

const supply = 10000;
const newMint = 1000;
const proposalDescription = "A new proposal";
const proposalDescriptionHash = ethers.utils.id(proposalDescription);
const daoName = "cantodao";
const image = "https://i.imgur.com/J2Awq0y.png";
const tokenName = "Test Token";
const tokenDenom = "TT";

// Mirror of proposal states from IGovernor
enum ProposalState {
  Pending,
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed,
}

const randomAddress = () => {
  const privateKey = ethers.utils.randomBytes(32);
  const wallet = new ethers.Wallet(privateKey);
  return wallet.address;
};

const getLatestProposalId = async (daoProposer: DAOProposer) => {
  const proposalCount = await daoProposer.proposalCount();
  if (proposalCount.eq(0)) {
    return null;
  }

  const proposalId = await daoProposer.proposalIDs(proposalCount.sub(1));

  return proposalId;
};

describe("DAO Governor", () => {
  // The fixture deploy the necessary contracts: token, governor and timelock controller
  const deployGovernorFixture = async () => {
    const [owner] = await ethers.getSigners();

    // Governor
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

    // Factory
    const DAOFactory = await ethers.getContractFactory("DAOFactory");
    const daoFactory = await DAOFactory.deploy(
      daoGovernorDeployer.address,
      daoExecutorDeployer.address,
      daoTokenDeployer.address,
      daoProposerDeployer.address
    );
    await daoFactory.deployed();

    // Create a new DAO
    await daoFactory.createDAO(daoName, image, tokenName, tokenDenom, supply);
    const daoCount = await daoFactory.getDAOCount();
    const newDaoAddress = await daoFactory.getDAO(
      daoCount.sub(BigNumber.from(1))
    );

    // Retrieve created contracts
    const DAOGovernor = await ethers.getContractFactory("DAOGovernor");
    const daoGovernor = await DAOGovernor.attach(newDaoAddress);

    const daoProposerAddress = await daoGovernor.proposer();
    const DAOProposer = await ethers.getContractFactory("DAOProposer");
    const daoProposer = await DAOProposer.attach(daoProposerAddress);

    const daoExecutorAddress = await daoGovernor.timelock();
    const DAOExecutor = await ethers.getContractFactory("DAOExecutor");
    const daoExecutor = await DAOExecutor.attach(daoExecutorAddress);

    const daoTokenAddress = await daoGovernor.token();
    const DAOToken = await ethers.getContractFactory("DAOToken");
    const daoToken = await DAOToken.attach(daoTokenAddress);

    return {
      owner,
      daoToken,
      daoExecutor,
      daoGovernor,
      daoProposer,
    };
  };

  it("Should be correctly instantiated", async () => {
    const { daoToken, daoGovernor, daoExecutor } = await loadFixture(
      deployGovernorFixture
    );

    // daoGovernor is instantiated with token and timelock controller
    expect(await daoGovernor.token()).to.equal(daoToken.address);
    expect(await daoGovernor.timelock()).to.equal(daoExecutor.address);
    expect(await daoGovernor.name()).to.equal(daoName);
    expect(await daoGovernor.votingDelay()).to.equal(0);
    expect(await daoGovernor.votingPeriod()).to.equal(360);
    expect(await daoGovernor.proposalThreshold()).to.equal(0);
    expect(await daoGovernor.imageURL()).to.equal(image);
  });

  it("Should allow to retrieve proposal contents", async () => {
    const { owner, daoToken, daoGovernor, daoProposer } = await loadFixture(
      deployGovernorFixture
    );

    // Proposal count is initially zero
    expect(await daoProposer.proposalCount()).to.equal(0);

    const transferCalldata = daoToken.interface.encodeFunctionData("transfer", [
      owner.address,
      10000,
    ]);

    // Send a propposal and get ID
    let tx = await daoProposer.propose(
      [daoToken.address],
      [0],
      [transferCalldata],
      proposalDescription
    );
    let actualProposalId = await getLatestProposalId(daoProposer);

    // Proposal count is incremented
    expect(await daoProposer.proposalCount()).to.equal(1);

    // Proposal ID can be retrieved from index
    let expectedProposalId = await daoProposer.proposalIDs(0);
    expect(expectedProposalId).to.equal(actualProposalId);

    // Proposal content can be retrieved by ID
    let proposalContent = await daoProposer.getProposalContent(
      expectedProposalId
    );
    expect(proposalContent[0][0]).to.equal(daoToken.address);
    expect(proposalContent[1][0]).to.equal(0);
    expect(proposalContent[2][0]).to.equal(transferCalldata);
    expect(proposalContent[3]).to.equal(proposalDescription);

    // Send a second proposal and check data
    tx = await daoProposer.propose(
      [owner.address],
      [40],
      ["0x"],
      proposalDescription
    );
    actualProposalId = await getLatestProposalId(daoProposer);
    expect(await daoProposer.proposalCount()).to.equal(2);
    expectedProposalId = await daoProposer.proposalIDs(1);
    expect(expectedProposalId).to.equal(actualProposalId);
    proposalContent = await daoProposer.getProposalContent(expectedProposalId);
    expect(proposalContent[0][0]).to.equal(owner.address);
    expect(proposalContent[1][0]).to.equal(40);
    expect(proposalContent[2][0]).to.equal("0x");
    expect(proposalContent[3]).to.equal(proposalDescription);
  });

  it("Should allow to vote and reject a proposal", async () => {
    const { owner, daoToken, daoGovernor, daoProposer } = await loadFixture(
      deployGovernorFixture
    );

    // Check votes is zero before delegating
    let votes = await daoToken.getVotes(owner.address);
    expect(votes).to.equal(0);

    // Delegate voting power to itself
    let tx = await daoToken.delegate(owner.address);

    // Check votes is equal to delegated funds which is equal to total supply
    votes = await daoToken.getVotes(owner.address);
    expect(votes).to.equal(supply);

    // Send a propposal and get ID
    tx = await daoProposer.propose(
      [daoToken.address],
      [0],
      [
        daoToken.interface.encodeFunctionData("transfer", [
          owner.address,
          10000,
        ]),
      ],
      proposalDescription
    );
    let proposalId = (await getLatestProposalId(daoProposer)) || 0;

    // Vote reject on the proposal
    let voted = await daoGovernor.hasVoted(proposalId, owner.address);
    expect(voted).to.equal(false);
    tx = await daoGovernor.castVote(proposalId, 0);
    voted = await daoGovernor.hasVoted(proposalId, owner.address);
    expect(voted).to.equal(true);

    // Check proposal is still active and against votes
    let proposalState = await daoGovernor.state(proposalId);
    expect(proposalState).to.equal(ProposalState.Active);
    let proposal = await daoGovernor.proposals(proposalId);
    expect(proposal.forVotes).to.equal(ethers.BigNumber.from(0));
    expect(proposal.againstVotes).to.equal(ethers.BigNumber.from(supply));

    // Check proposal is rejected after end of voting period
    mine(1000);
    proposalState = await daoGovernor.state(proposalId);
    expect(proposalState).to.equal(ProposalState.Defeated);
  });

  it("Should allow to vote, approve and execute a proposal to mint tokens", async () => {
    const { owner, daoToken, daoGovernor, daoExecutor, daoProposer } =
      await loadFixture(deployGovernorFixture);

    // Delegate voting power to itself
    let tx = await daoToken.delegate(owner.address);

    // Propose a mint proposal
    tx = await daoProposer.propose(
      [daoToken.address],
      [0],
      [daoToken.interface.encodeFunctionData("mint", [newMint])],
      proposalDescription
    );

    // Get proposal ID
    let proposalId = (await getLatestProposalId(daoProposer)) || 0;

    // Vote approve on the proposal
    let voted = await daoGovernor.hasVoted(proposalId, owner.address);
    expect(voted).to.equal(false);
    tx = await daoGovernor.castVote(proposalId, 1);
    voted = await daoGovernor.hasVoted(proposalId, owner.address);
    expect(voted).to.equal(true);

    // Check proposal is still active and for votes
    let proposalState = await daoGovernor.state(proposalId);
    expect(proposalState).to.equal(ProposalState.Active);
    let proposal = await daoGovernor.proposals(proposalId);
    expect(proposal.forVotes).to.equal(ethers.BigNumber.from(supply));
    expect(proposal.againstVotes).to.equal(ethers.BigNumber.from(0));

    // Check proposal is approved after end of voting period
    mine(1000);
    proposalState = await daoGovernor.state(proposalId);
    expect(proposalState).to.equal(ProposalState.Succeeded);

    // Queue the proposal
    tx = await daoGovernor["queue(address[],uint256[],bytes[],bytes32)"](
      [daoToken.address],
      [0],
      [daoToken.interface.encodeFunctionData("mint", [newMint])],
      proposalDescriptionHash
    );

    // Check proposal is queued
    proposalState = await daoGovernor.state(proposalId);
    expect(proposalState).to.equal(ProposalState.Queued);

    // Check proposal is executed after end of delay
    mine(1000);
    tx = await daoGovernor["execute(address[],uint256[],bytes[],bytes32)"](
      [daoToken.address],
      [0],
      [daoToken.interface.encodeFunctionData("mint", [newMint])],
      proposalDescriptionHash
    );

    // Check proposal is executed
    proposalState = await daoGovernor.state(proposalId);
    expect(proposalState).to.equal(ProposalState.Executed);

    // Check token supply is updated
    let totalSupply = await daoToken.totalSupply();
    expect(totalSupply).to.equal(ethers.BigNumber.from(supply + newMint));

    // Check the timelock controller balance is updated
    let balance = await daoToken.balanceOf(daoExecutor.address);
    expect(balance).to.equal(ethers.BigNumber.from(newMint));
  });

  it("Should allow to vote, approve and execute a proposal to send funds", async () => {
    const { owner, daoToken, daoGovernor, daoExecutor, daoProposer } =
      await loadFixture(deployGovernorFixture);

    const sampleAddr = randomAddress();
    let balance = await ethers.provider.getBalance(sampleAddr);
    expect(balance).to.equal(ethers.BigNumber.from(0));

    // Delegate voting power to itself
    await daoToken.delegate(owner.address);

    // Send ethers to the dao executor
    await owner.sendTransaction({
      to: daoExecutor.address,
      value: ethers.BigNumber.from(100),
    });

    // Check the dao executor ethers balance is updated
    balance = await ethers.provider.getBalance(daoExecutor.address);
    expect(balance).to.equal(ethers.BigNumber.from(100));

    // Propose a send ethers proposal
    let tx = await daoProposer.propose(
      [sampleAddr],
      [40],
      ["0x"],
      proposalDescription
    );
    let proposalId = (await getLatestProposalId(daoProposer)) || 0;

    // Vote approve on the proposal
    tx = await daoGovernor.castVote(proposalId, 1);

    // Check proposal is approved after end of voting period
    mine(1000);
    let proposalState = await daoGovernor.state(proposalId);
    expect(proposalState).to.equal(ProposalState.Succeeded);

    // Queue the proposal
    tx = await daoGovernor["queue(address[],uint256[],bytes[],bytes32)"](
      [sampleAddr],
      [40],
      ["0x"],
      proposalDescriptionHash
    );

    // Check proposal is executed after end of delay
    mine(1000);
    tx = await daoGovernor["execute(address[],uint256[],bytes[],bytes32)"](
      [sampleAddr],
      [40],
      ["0x"],
      proposalDescriptionHash
    );

    // Check proposal is executed
    proposalState = await daoGovernor.state(proposalId);
    expect(proposalState).to.equal(ProposalState.Executed);

    // Check balances
    balance = await ethers.provider.getBalance(daoExecutor.address);
    expect(balance).to.equal(ethers.BigNumber.from(60));
    const newBalance = await ethers.provider.getBalance(sampleAddr);
    expect(newBalance).to.equal(ethers.BigNumber.from(40));
  });
});
