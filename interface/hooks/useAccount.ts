import { useEffect, useState } from "react";

import { useAccount } from "wagmi";

import { GetAccountResult, Provider } from "@wagmi/core";

// This is a wrapper of wagmi useAccount hook that fixes the hydration issue
const useAccountWrapped = (): GetAccountResult<Provider> => {
  const config = useAccount();

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setConnected(config.isConnected);
  }, [config.isConnected]);

  const configCopy = { ...config };
  configCopy.isConnected = connected;

  return configCopy;
};

export default useAccountWrapped;
