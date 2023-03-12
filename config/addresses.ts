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
    note: "0x05b47213E2A866C17E6cbB291Adf7bAe5001a3Da",
    daoFactory: "0x29D47977E4e9Afbdd564bb90576e5Df21dD77453",
    daoList: [
      "0x7E4F8B085fCf14a8e8f227Eb5c2700EB62ef0E38",
      "0xFFFa69928C6B62254c1811A2Cb35110711ef777d",
    ],
    turnstile: "0xEcf044C5B4b867CFda001101c617eCd347095B44",
  },
};
