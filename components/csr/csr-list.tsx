import { BigNumber } from 'ethers';

import {
  Box,
  Text,
} from '@chakra-ui/react';

import useQueryNFTBalance from '../../hooks/queries/useQueryNFTBalance';
import ContainerSpaced from '../ui/container-spaced';
import { CSRInfoFromIndex } from './csr-info-from-index';

export const CSRList = ({
  csrContract,
  holderAddress,
}: {
  csrContract: string;
  holderAddress: string;
}) => {
  const {
    balance,
    error: errorBalance,
    isLoading: isLoadingBalance,
  } = useQueryNFTBalance(holderAddress, csrContract);

  return (
    <>
      {!isLoadingBalance && !errorBalance && balance && (
        <ContainerSpaced>
          <Box display="flex" flexDirection="row" alignItems="flex-start">
            <Text>CSR ID</Text>
            <Text ml="auto">Earned fees</Text>
          </Box>
          {Array.from(Array(balance.toNumber()).keys()).map((index) => (
            <CSRInfoFromIndex
              key={index}
              csrContract={csrContract}
              holderAddress={holderAddress}
              tokenIndex={BigNumber.from(index)}
            />
          ))}
        </ContainerSpaced>
      )}
      {!isLoadingBalance && !errorBalance && balance?.isZero() && (
        <Text>The DAO has no CSR</Text>
      )}
    </>
  );
};
