import { ethers } from "hardhat";

const supply = 10000;

const main = async () => {
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
    "cantodao",
    4,
    daoToken.address,
    timelockController.address,
    0,
    600,
    0
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

  console.log("Contracts deployed");
  console.table([
    ["DAO Token", daoToken.address],
    ["Timelock Controller", timelockController.address],
    ["DAO Governor", daoGovernor.address],
  ]);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
