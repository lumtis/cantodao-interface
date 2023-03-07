// Used network
export const DefaultNetwork = "localhost";
export const CantoTestnetNetwork = "cantotest";

export const GetTurnstileAddress = (): `0x${string}` => {
  const network = process.env.NEXT_PUBLIC_NETWORK || DefaultNetwork;
  return addresses[network].turnstile;
};

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
    turnstile: `0x${string}`;
    daoList: `0x${string}`[];
  };
} = {
  localhost: {
    note: "0xa513e6e4b8f2a923d98304ec87f64353c4d5c853",
    daoFactory: "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707",
    daoList: [],
    turnstile: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
  },
  cantotest: {
    note: "0xba42601EF6d6C4fe615A4Fc6D54677cC680C788C",
    daoFactory: "0x24A33D2511CfCa006a333aC352A4Cd428442257a",
    daoList: [
      "0x65513EA608273291d331FF2a03716b3C4bF1EE30",
      "0x7910f45561F31b4bbc34b18e68Fb1BE851b6Acc2",
    ],
    turnstile: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512", // TODO: update
  },
};
