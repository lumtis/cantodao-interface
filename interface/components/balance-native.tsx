import { useBalance } from "wagmi";

import { Heading, Spinner } from "@chakra-ui/react";

import Code from "./ui/code";
import ContainerSpaced from "./ui/container-spaced";

export const BalanceNative = ({ holderAddress }: { holderAddress: string }) => {
  const { data, isError, isLoading } = useBalance({
    address: holderAddress as `0x${string}`,
  });

  // TODO: handle errors
  let balanceComp = <Spinner />;
  if (!isError && !isLoading && data) {
    balanceComp = (
      <ContainerSpaced>
        <Heading>Native</Heading>
        <Code textAlign="right">
          {data?.formatted}
          {data?.symbol}
        </Code>
      </ContainerSpaced>
    );
  }

  return balanceComp;
};
