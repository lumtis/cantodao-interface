import { useEffect } from "react";

import { BigNumber } from "ethers";

import { Spinner } from "@chakra-ui/react";

import useQueryTokenBalance from "../hooks/queries/useTokenBalance";
import useQueryTokenInfo from "../hooks/queries/useTokenInfo";
import { FormatToken } from "../types/token";
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

  return (
    <>
      {!isLoadingInfo &&
      !isLoadingBalance &&
      !errorInfo &&
      !errorBalance &&
      tokenInfo &&
      balance ? (
        <Param name={tokenInfo?.name} value={FormatToken(balance, tokenInfo)} />
      ) : (
        <Spinner />
      )}
    </>
  );
};
