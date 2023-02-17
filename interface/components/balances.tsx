import { Box, Spinner, Text } from "@chakra-ui/react";

import { Balance } from "./balance";
import { BalanceNative } from "./balance-native";
import ContainerSpaced from "./ui/container-spaced";
import { CopyCard } from "./ui/copy-card";

export const Balances = ({
  contractAddresses,
  holderAddress,
  includeNative,
}: {
  contractAddresses?: string[];
  holderAddress?: string;
  includeNative?: boolean;
}) => {
  if (!holderAddress || !contractAddresses) {
    return <Spinner />;
  }

  return (
    <ContainerSpaced>
      {includeNative && (
        <Box>
          <BalanceNative holderAddress={holderAddress} />
        </Box>
      )}
      {contractAddresses.map((contractAddress, index) => (
        <Box key={index}>
          <Balance
            contractAddress={contractAddress}
            holderAddress={holderAddress}
          />
        </Box>
      ))}
      <Text>Treasury Address:</Text>
      <CopyCard address={holderAddress} />
    </ContainerSpaced>
  );
};
