import {
  Box,
  Spinner,
} from '@chakra-ui/react';

import ContainerSpaced from '../ui/container-spaced';
import { Balance } from './balance';
import { BalanceNative } from './balance-native';

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

  // TODO: Get $NOTE address on Canto testnet if exists
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
    </ContainerSpaced>
  );
};
