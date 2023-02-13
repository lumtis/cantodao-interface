import "@nomicfoundation/hardhat-toolbox";

import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;
