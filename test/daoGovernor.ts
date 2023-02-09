import { expect } from "chai";
import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("DAO Governor", () => {
  it("Should do random tests", async () => {
    const [owner] = await ethers.getSigners();

    // Deploy the token
    const DAOToken = await ethers.getContractFactory("DAOToken");
    const daoToken = await DAOToken.deploy("foo", "FOO", 10000);
    await daoToken.deployed();

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
    await timelockController.renounceRole(
      await timelockController.PROPOSER_ROLE(),
      owner.address
    );
    await timelockController.renounceRole(
      await timelockController.TIMELOCK_ADMIN_ROLE(),
      owner.address
    );

    // Send a propposal
    let tx = await daoGovernor["propose(address[],uint256[],bytes[],string)"](
      [daoToken.address],
      [0],
      [
        daoToken.interface.encodeFunctionData("transfer", [
          owner.address,
          10000,
        ]),
      ],
      "Mint 10000 tokens to the owner"
    );

    let receipt = await tx.wait();
    let proposalId = ethers.BigNumber.from(
      receipt.events?.[0].args?.proposalId
    );

    let proposal = await daoGovernor.proposals(proposalId);
    // console.log("proposal: ", proposal);

    // Vote on the proposal
    tx = await daoGovernor.castVote(proposalId, 0);
    receipt = await tx.wait();
    proposal = await daoGovernor.proposals(proposalId);
    console.log("receipt: ", receipt.events?.[0].args);
  });
});
