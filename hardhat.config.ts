import "@nomicfoundation/hardhat-toolbox";

import { HardhatUserConfig } from "hardhat/config";

// A mnemonic with no fund, just used to prevent the scripts from failing
const sampleMnemonic =
  "square shy digital ankle faculty total host scene census holiday wise service";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    cantotest: {
      url: "https://eth.plexnode.wtf/",
      chainId: 740,
      accounts: {
        mnemonic: process.env.TESTNET_MNEMONIC || sampleMnemonic,
      },
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
