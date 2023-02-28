// Used network
export const DefaultNetwork = "localhost";
export const CantoTestnetNetwork = "cantotest";

export const GetNoteAddress = (): `0x${string}` => {
  const network = process.env.NEXT_PUBLIC_NETWORK || DefaultNetwork;
  return addresses[network].note;
};

export const GetDaoFactoryAddress = (): `0x${string}` => {
  const network = process.env.NEXT_PUBLIC_NETWORK || DefaultNetwork;
  return addresses[network].daoFactory;
};

export const GetDaoListAddresses = (): `0x${string}`[] => {
  const network = process.env.NEXT_PUBLIC_NETWORK || DefaultNetwork;
  return addresses[network].daoList;
};

// Deployed addresses
const addresses: {
  [network: string]: {
    note: `0x${string}`;
    daoFactory: `0x${string}`;
    daoList: `0x${string}`[];
  };
} = {
  localhost: {
    note: "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9",
    daoFactory: "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",
    daoList: [],
  },
  cantotest: {
    note: "0x79EF7FA6bfb942D7036E8397D1611710BC8AE774",
    daoFactory: "0x29D47977E4e9Afbdd564bb90576e5Df21dD77453",
    daoList: [
      "0x70C64A39FEAE76a8aB2dE630D0Da5873c8Ab4fa8",
      "0x54715A6A669A98589907e5311DC2C7F77e98ac0B",
    ],
  },
};
