import { ethers } from "hardhat";

import { DeployDAO, DeployFactory, images } from "./utils";

const supply = 10000;

const main = async () => {
  const [owner] = await ethers.getSigners();

  const { daoFactory } = await DeployFactory();
  const daoFactoryAddress = daoFactory.address;

  // Create DAOs
  const { daoToken, daoProposer } = await DeployDAO(
    owner,
    daoFactoryAddress,
    "Crocodile DAO",
    images.crocodile,
    "Crocodile",
    "CROCODILE",
    supply
  );
  await DeployDAO(
    owner,
    daoFactoryAddress,
    "Cantodao",
    images.blocks,
    "Cantodao",
    "DAOX",
    supply
  );
  await DeployDAO(
    owner,
    daoFactoryAddress,
    "Foobar",
    images.foobar,
    "Foo",
    "FOO",
    supply
  );
  await DeployDAO(
    owner,
    daoFactoryAddress,
    "Canto",
    images.canto,
    "Canto DAO Token",
    "Cantox",
    supply
  );
  await DeployDAO(
    owner,
    daoFactoryAddress,
    "Evmos",
    images.evmos,
    "Evmos DAO Token",
    "Evmosx",
    supply
  );

  // Create proposals
  // Transfer tokens
  await daoProposer.propose(
    [daoToken.address],
    [0],
    [daoToken.interface.encodeFunctionData("transfer", [owner.address, 10000])],
    "Transfering DAO tokens to myself"
  );

  // Transfer funds
  await daoProposer.propose(
    [owner.address],
    [40],
    ["0x"],
    "Transfering fund to myself"
  );

  // Mint tokens
  await daoProposer.propose(
    [daoToken.address],
    [0],
    [daoToken.interface.encodeFunctionData("mint", [owner.address])],
    "Minting DAO tokens"
  );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
