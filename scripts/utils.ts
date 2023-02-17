import { BigNumber } from "ethers";
import { ethers } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { DAOExecutor } from "../typechain-types/contracts/DAOExecutor";
import { DAOGovernor } from "../typechain-types/contracts/DAOGovernor";
import { DAOProposer } from "../typechain-types/contracts/DAOProposer";
import { DAOToken } from "../typechain-types/contracts/DAOToken";

export const images = {
  crocodile: "https://i.imgur.com/J2Awq0y.png",
  blocks: "https://i.imgur.com/SAYLq5h.png",
  foobar: "",
  canto: "https://i.imgur.com/5dCmheE.png",
  evmos: "https://i.imgur.com/xThllu4.png",
};

const getBytecodeSize = async (contract: any) => {
  const contractCode = await ethers.provider.getCode(contract.address);
  return contractCode.length / 2;
};

export const DeployFactory = async () => {
  // Governor
  const DAOGovernorDeployer = await ethers.getContractFactory(
    "DAOGovernorDeployer"
  );
  const daoGovernorDeployer = await DAOGovernorDeployer.deploy();
  await daoGovernorDeployer.deployed();

  // Token
  const DAOTokenDeployer = await ethers.getContractFactory("DAOTokenDeployer");
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

  console.table([
    [
      "daoGovernorDeployer",
      daoGovernorDeployer.address,
      await getBytecodeSize(daoGovernorDeployer),
    ],
    [
      "daoTokenDeployer",
      daoTokenDeployer.address,
      await getBytecodeSize(daoTokenDeployer),
    ],
    [
      "daoExecutorDeployer",
      daoExecutorDeployer.address,
      await getBytecodeSize(daoExecutorDeployer),
    ],
    [
      "daoProposerDeployer",
      daoProposerDeployer.address,
      await getBytecodeSize(daoProposerDeployer),
    ],
    ["daoFactory", daoFactory.address, await getBytecodeSize(daoFactory)],
  ]);

  return {
    daoFactory,
  };
};

export const DeployDAO = async (
  owner: SignerWithAddress,
  daoFactoryAddress: string,
  daoName: string,
  daoImage: string,
  tokenName: string,
  tokenDenom: string,
  supply: number
): Promise<{
  daoToken: DAOToken;
  daoExecutor: DAOExecutor;
  daoGovernor: DAOGovernor;
  daoProposer: DAOProposer;
}> => {
  const DAOFactory = await ethers.getContractFactory("DAOFactory");
  const daoFactory = await DAOFactory.attach(daoFactoryAddress);

  const tx = await daoFactory.createDAO(
    daoName,
    daoImage,
    tokenName,
    tokenDenom,
    supply
  );
  await tx.wait();
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

  // Send some values to the DAO
  await owner.sendTransaction({
    to: daoExecutor.address,
    value: ethers.utils.parseEther("10"),
  });

  console.log(daoName + " deployed");
  console.table([
    ["DAO Token", daoToken.address, await getBytecodeSize(daoToken)],
    ["DAO Executor", daoExecutor.address, await getBytecodeSize(daoExecutor)],
    ["DAO Proposer", daoProposer.address, await getBytecodeSize(daoProposer)],
    ["DAO Governor", daoGovernor.address, await getBytecodeSize(daoGovernor)],
  ]);

  return {
    daoToken,
    daoExecutor,
    daoGovernor,
    daoProposer,
  };
};
