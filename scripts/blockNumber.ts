import { ethers } from "hardhat";

const main = async () => {
  // initialize provider with a custom chain ID
  const provider = new ethers.providers.JsonRpcProvider("http://0.0.0.0:8545", {
    chainId: 1337,
    name: "localhost",
  });

  const blockNumber = await provider.getBlockNumber();

  console.log("block number: " + blockNumber);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
