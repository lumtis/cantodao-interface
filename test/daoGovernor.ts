import { expect } from "chai";
import { ethers } from "hardhat";

import { loadFixture, mine } from "@nomicfoundation/hardhat-network-helpers";

const supply = 10000;
const newMint = 1000;
const proposalDescription = "A new proposal";
const proposalDescriptionHash = ethers.utils.id(proposalDescription);
const daoName = "cantodao";

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

describe("DAO Governor", () => {
  // The fixture deploy the necessary contracts: token, governor and timelock controller
  const deployGovernorFixture = async () => {
    const [owner] = await ethers.getSigners();

    // Deploy the DAO token
    const DAOToken = await ethers.getContractFactory("DAOToken");
    const daoToken = await DAOToken.deploy("foo", "FOO", supply);
    await daoToken.deployed();

    // Deploy the timelock controller with deployer as admin
    const DAOExecutor = await ethers.getContractFactory("DAOExecutor");
    const daoExecutor = await DAOExecutor.deploy(
      [owner.address],
      [],
      owner.address
    );
    await daoExecutor.deployed();

    // Deploy the governor
    const DAOGovernor = await ethers.getContractFactory("DAOGovernor");
    const daoGovernor = await DAOGovernor.deploy(
      daoName,
      daoToken.address,
      daoExecutor.address,
      4,
      0,
      600,
      0
    );
    await daoGovernor.deployed();

    // Grant proposer role to the governor and renounce it from the owner
    await daoExecutor.grantRole(
      await daoExecutor.PROPOSER_ROLE(),
      daoGovernor.address
    );
    await daoExecutor.grantRole(
      await daoExecutor.EXECUTOR_ROLE(),
      daoGovernor.address
    );
    await daoExecutor.renounceRole(
      await daoExecutor.PROPOSER_ROLE(),
      owner.address
    );
    await daoExecutor.renounceRole(
      await daoExecutor.TIMELOCK_ADMIN_ROLE(),
      owner.address
    );

    // Transfer ownership of the token to the governor
    await daoToken.transferOwnership(daoExecutor.address);

    return {
      owner,
      daoToken,
      daoExecutor,
      daoGovernor,
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
    expect(await daoGovernor.votingPeriod()).to.equal(600);
    expect(await daoGovernor.proposalThreshold()).to.equal(0);
  });

  it("Should allow to vote and reject a proposal", async () => {
    const { owner, daoToken, daoGovernor } = await loadFixture(
      deployGovernorFixture
    );

    // Delegate voting power to itself
    let tx = await daoToken.delegate(owner.address);

    // Send a propposal and get ID
    tx = await daoGovernor["propose(address[],uint256[],bytes[],string)"](
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
    let receipt = await tx.wait();
    let proposalId = ethers.BigNumber.from(
      receipt.events?.[0].args?.proposalId
    );

    // Vote reject on the proposal
    tx = await daoGovernor.castVote(proposalId, 0);

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
    const { owner, daoToken, daoGovernor, daoExecutor } = await loadFixture(
      deployGovernorFixture
    );

    // Delegate voting power to itself
    let tx = await daoToken.delegate(owner.address);

    // Propose a mint proposal
    tx = await daoGovernor["propose(address[],uint256[],bytes[],string)"](
      [daoToken.address],
      [0],
      [daoToken.interface.encodeFunctionData("mint", [newMint])],
      proposalDescription
    );

    // Get proposal ID
    let receipt = await tx.wait();
    let proposalId = ethers.BigNumber.from(
      receipt.events?.[0].args?.proposalId
    );

    // Vote approve on the proposal
    tx = await daoGovernor.castVote(proposalId, 1);

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
    const { owner, daoToken, daoGovernor, daoExecutor } = await loadFixture(
      deployGovernorFixture
    );

    const sampleAddr = randomAddress();
    let balance = await ethers.provider.getBalance(sampleAddr);
    expect(balance).to.equal(ethers.BigNumber.from(0));

    // Delegate voting power to itself
    await daoToken.delegate(owner.address);

    // Send ethers to the timelock controller\
    await owner.sendTransaction({
      to: daoExecutor.address,
      value: ethers.BigNumber.from(100),
    });

    // Check the timelock controller ethers balance is updated
    balance = await ethers.provider.getBalance(daoExecutor.address);
    expect(balance).to.equal(ethers.BigNumber.from(100));

    // Propose a send ethers proposal
    let tx = await daoGovernor["propose(address[],uint256[],bytes[],string)"](
      [sampleAddr],
      [40],
      [ethers.utils.arrayify([])],
      proposalDescription
    );
    let receipt = await tx.wait();
    let proposalId = ethers.BigNumber.from(
      receipt.events?.[0].args?.proposalId
    );

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
      [ethers.utils.arrayify([])],
      proposalDescriptionHash
    );

    // Check proposal is executed after end of delay
    mine(1000);
    tx = await daoGovernor["execute(address[],uint256[],bytes[],bytes32)"](
      [sampleAddr],
      [40],
      [ethers.utils.arrayify([])],
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
