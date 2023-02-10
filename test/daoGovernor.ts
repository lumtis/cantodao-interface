import { expect } from "chai";
import { ethers } from "hardhat";

import { loadFixture, mine } from "@nomicfoundation/hardhat-network-helpers";

const supply = 10000;
const newMint = 1000;
const proposalDescription = "A new proposal";
const proposalDescriptionHash = ethers.utils.id(proposalDescription);

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

describe("DAO Governor", () => {
  // The fixture deploy the necessary contracts: token, governor and timelock controller
  const deployGovernorFixture = async () => {
    const [owner] = await ethers.getSigners();

    // Deploy the DAO token
    const DAOToken = await ethers.getContractFactory("DAOToken");
    const daoToken = await DAOToken.deploy("foo", "FOO", supply);
    await daoToken.deployed();

    // Deploy the timelock controller with deployer as admin
    const TimelockController = await ethers.getContractFactory(
      "TimelockController"
    );
    const timelockController = await TimelockController.deploy(
      1,
      [owner.address],
      [],
      owner.address
    );
    await timelockController.deployed();

    // Deploy the governor
    const DAOGovernor = await ethers.getContractFactory("DAOGovernor");
    const daoGovernor = await DAOGovernor.deploy(
      daoToken.address,
      timelockController.address
    );
    await daoGovernor.deployed();

    // Grant proposer role to the governor and renounce it from the owner
    await timelockController.grantRole(
      await timelockController.PROPOSER_ROLE(),
      daoGovernor.address
    );
    await timelockController.grantRole(
      await timelockController.EXECUTOR_ROLE(),
      daoGovernor.address
    );
    await timelockController.renounceRole(
      await timelockController.PROPOSER_ROLE(),
      owner.address
    );
    await timelockController.renounceRole(
      await timelockController.TIMELOCK_ADMIN_ROLE(),
      owner.address
    );

    // Transfer ownership of the token to the governor
    await daoToken.transferOwnership(timelockController.address);

    return {
      owner,
      daoToken,
      timelockController,
      daoGovernor,
    };
  };

  it("Should be correctly instantiated", async () => {
    const { daoToken, daoGovernor, timelockController } = await loadFixture(
      deployGovernorFixture
    );

    // daoGovernor is instantiated with token and timelock controller
    expect(await daoGovernor.token()).to.equal(daoToken.address);
    expect(await daoGovernor.timelock()).to.equal(timelockController.address);
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

  it("Should allow to vote, approve and execute a proposal", async () => {
    const { owner, daoToken, daoGovernor, timelockController } =
      await loadFixture(deployGovernorFixture);

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
    let balance = await daoToken.balanceOf(timelockController.address);
    expect(balance).to.equal(ethers.BigNumber.from(newMint));
  });
});
