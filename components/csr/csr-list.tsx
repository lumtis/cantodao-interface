import { BigNumber } from 'ethers';

import {
  Box,
  Text,
} from '@chakra-ui/react';

import useQueryNFTBalance from '../../hooks/queries/useQueryNFTBalance';
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
        <>
          <Box display="flex" flexDirection="row" alignItems="flex-start">
            <Text fontSize="30px">Token Id</Text>
            <Text fontSize="30px" m="auto">
              Earned fees
            </Text>
          </Box>
          {Array.from(Array(balance.toNumber()).keys()).map((index) => (
            <CSRInfoFromIndex
              csrContract={csrContract}
              holderAddress={holderAddress}
              tokenIndex={BigNumber.from(index)}
            />
          ))}
        </>
      )}
      {!isLoadingBalance && !errorBalance && balance?.isZero() && (
        <Text>The DAO has no CSR</Text>
      )}
    </>
  );
};
