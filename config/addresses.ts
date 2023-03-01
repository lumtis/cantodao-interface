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
    turnstile: `0x${string}`;
    daoList: `0x${string}`[];
  };
} = {
  localhost: {
    note: "0x0165878a594ca255338adfa4d48449f69242eb8f",
    daoFactory: "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9",
    daoList: [],
    turnstile: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
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
