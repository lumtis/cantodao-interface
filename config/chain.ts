export const NativeToken = "Canto";
export const NativeSymbol = "CANTO";
export const blockTime = 5;

// Chain configuration for Canto testnet
export const CantoTestnet = {
  id: 7701,
  name: "Canto Testnet",
  network: "cantotest",
  nativeCurrency: {
    decimals: 18,
    name: "Canto",
    symbol: "CANTO",
  },
  rpcUrls: {
    default: {
      http: ["https://canto-testnet.plexnode.wtf"],
    },
    public: {
      http: ["https://canto-testnet.plexnode.wtf"],
    },
  },
  blockExplorers: {
    default: {
      name: "Canto Testnet Explorer",
      url: "https://testnet.tuber.build/",
    },
  },
};

// Get explorer
export const GetExplorer = (): string | null => {
  switch (process.env.NEXT_PUBLIC_NETWORK) {
    case "cantotest":
      return "https://testnet.tuber.build/tx/";
    default:
      return null;
  }
};
