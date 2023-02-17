import { useEffect } from "react";

import { BigNumber } from "ethers";

import { Spinner } from "@chakra-ui/react";

import useQueryTokenBalance from "../hooks/queries/useTokenBalance";
import useQueryTokenInfo from "../hooks/queries/useTokenInfo";
import Param from "./ui/param";

export const Balance = ({
  contractAddress,
  holderAddress,
  setBalance,
}: {
  contractAddress: string;
  holderAddress: string;
  setBalance?: (balance: BigNumber) => void;
}) => {
  // fetch balance and token info
  const {
    tokenInfo,
    error: errorInfo,
    isLoading: isLoadingInfo,
  } = useQueryTokenInfo(contractAddress);
  const {
    balance,
    error: errorBalance,
    isLoading: isLoadingBalance,
  } = useQueryTokenBalance(contractAddress, holderAddress);

  // set balance for parent component
  useEffect(() => {
    if (balance && setBalance) {
      setBalance(balance);
    }
  }, [balance, setBalance]);

  // TODO: handle errors
  let balanceComp = <Spinner />;
  if (
    !isLoadingInfo &&
    !isLoadingBalance &&
    !errorInfo &&
    !errorBalance &&
    tokenInfo &&
    balance
  ) {
    balanceComp = (
      <Param
        name={tokenInfo?.name}
        value={balance.toString() + " " + tokenInfo?.symbol}
      />
    );
  }

  return balanceComp;
};
