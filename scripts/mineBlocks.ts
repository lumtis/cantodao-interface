import { ethers } from "hardhat";

const BLOCKS_TO_MINE = 500;

const main = async () => {
  // initialize provider with a custom chain ID
  const provider = new ethers.providers.JsonRpcProvider("http://0.0.0.0:8545", {
    chainId: 1337,
    name: "localhost",
  });

  console.log("mining blocks...");
  for (let i = 0; i < BLOCKS_TO_MINE; i++) {
    await provider.send("evm_mine", []);
  }

  const blockNumber = await provider.getBlockNumber();
  console.log("new block number: " + blockNumber);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
