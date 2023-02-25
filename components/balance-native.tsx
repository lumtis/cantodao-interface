import { useBalance } from "wagmi";

import { Spinner } from "@chakra-ui/react";

import { NativeToken } from "../config/chain";
import Param from "./ui/param";

export const BalanceNative = ({ holderAddress }: { holderAddress: string }) => {
  const { data, isError, isLoading } = useBalance({
    address: holderAddress as `0x${string}`,
  });

  // TODO: handle errors
  let balanceComp = <Spinner />;
  if (!isError && !isLoading && data) {
    balanceComp = <Param name={NativeToken} value={"⋐" + data?.formatted} />;
  }

  return balanceComp;
};
