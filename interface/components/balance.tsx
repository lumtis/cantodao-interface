import { Heading, Spinner } from "@chakra-ui/react";

import useQueryTokenBalance from "../hooks/queries/useTokenBalance";
import useQueryTokenInfo from "../hooks/queries/useTokenInfo";
import Code from "./ui/code";
import ContainerSpaced from "./ui/container-spaced";

export const Balance = ({
  contractAddress,
  holderAddress,
}: {
  contractAddress: string;
  holderAddress: string;
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
      <ContainerSpaced>
        <Heading>{tokenInfo?.name}</Heading>
        <Code textAlign="right">
          {balance.toString()}
          {tokenInfo?.symbol}
        </Code>
      </ContainerSpaced>
    );
  }

  return balanceComp;
};
