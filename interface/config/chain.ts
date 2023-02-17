export const NativeToken = "Canto";
export const NativeSymbol = "CANTO";
export const blockTime = 5;

// Chain configuration for Canto testnet
export const CantoTestnet = {
  id: 740,
  name: "Canto Testnet",
  network: "cantotest",
  nativeCurrency: {
    decimals: 18,
    name: "Canto",
    symbol: "CANTO",
  },
  rpcUrls: {
    default: {
      http: ["https://eth.plexnode.wtf/"],
    },
    public: {
      http: ["https://eth.plexnode.wtf/"],
    },
  },
  blockExplorers: {
    default: {
      name: "Canto Testnet Explorer",
      url: "https://testnet-explorer.canto.neobase.one/",
    },
  },
};
