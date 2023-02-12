import { Box, Spinner } from "@chakra-ui/react";

import { Balance } from "./balance";
import { BalanceNative } from "./balance-native";
import ContainerSpaced from "./ui/container-spaced";

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
      {contractAddresses.map((contractAddress) => (
        <Box>
          <Balance
            contractAddress={contractAddress}
            holderAddress={holderAddress}
          />
        </Box>
      ))}
    </ContainerSpaced>
  );
};
