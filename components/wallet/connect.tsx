import { IoExit, IoWallet } from "react-icons/io5";
import { useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { Icon } from "@chakra-ui/react";

import useAccountWrapped from "../../hooks/useAccount";
import Button from "../ui/button";

export const Connect = () => {
  const { isConnected } = useAccountWrapped();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <Button
        w="full"
        minW="fit-content"
        size="md"
        onClick={() => disconnect()}
      >
        <Icon as={IoExit} mr={2} />
        {"Disconnect"}
      </Button>
    );
  return (
    <Button w="full" minW="fit-content" size="md" onClick={() => connect()}>
      <Icon as={IoWallet} mr={2} />
      {"Connect Wallet"}
    </Button>
  );
};
