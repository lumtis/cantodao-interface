import { ethers } from "hardhat";

const supply = 10000;

const main = async () => {
  const [owner] = await ethers.getSigners();

  // Deploy the DAO token
  const DAOToken = await ethers.getContractFactory("DAOToken");
  const daoToken = await DAOToken.deploy("Foo", "FOO", supply);
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
    "Cantodao",
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

  await owner.sendTransaction({
    to: daoExecutor.address,
    value: ethers.utils.parseEther("10"),
  });

  console.log("Contracts deployed");
  console.table([
    ["DAO Token", daoToken.address],
    ["DAO Executor", daoExecutor.address],
    ["DAO Governor", daoGovernor.address],
  ]);

  // Create proposals

  // Transfger tokens
  await daoGovernor["propose(address[],uint256[],bytes[],string)"](
    [daoToken.address],
    [0],
    [daoToken.interface.encodeFunctionData("transfer", [owner.address, 10000])],
    "Transfering DAO tokens to myself"
  );

  // Transfer funds
  await daoGovernor["propose(address[],uint256[],bytes[],string)"](
    [owner.address],
    [40],
    ["0x"],
    "Transfering fund to myself"
  );

  // Mint tokens
  await daoGovernor["propose(address[],uint256[],bytes[],string)"](
    [daoToken.address],
    [0],
    [daoToken.interface.encodeFunctionData("mint", [owner.address])],
    "Minting DAO tokens"
  );
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
