import { ethers } from "hardhat";

import { DeployDAO, images } from "./utils";

const supply = 1000000;
const daoFactoryAddress = "0x29D47977E4e9Afbdd564bb90576e5Df21dD77453";

const main = async () => {
  const [owner] = await ethers.getSigners();

  // Create DAOs
  await DeployDAO(
    owner,
    daoFactoryAddress,
    "Crocodile DAO",
    images.crocodile,
    "Crocodile",
    "CROCODILE",
    supply
  );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
