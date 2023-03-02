import { BigNumber } from 'ethers';

import { Spinner } from '@chakra-ui/react';

import useQueryNFTFromIndex from '../../hooks/queries/useQueryNFTFromIndex';
import { CSRInfo } from './csr-info';

export const CSRInfoFromIndex = ({
  csrContract,
  holderAddress,
  tokenIndex,
}: {
  csrContract: string;
  holderAddress: string;
  tokenIndex: BigNumber;
}) => {
  const { tokenId, error, isLoading } = useQueryNFTFromIndex(
    holderAddress,
    tokenIndex,
    csrContract
  );

  return (
    <>
      {!isLoading && !error && tokenId ? (
        <CSRInfo csrContract={csrContract} tokenId={tokenId} />
      ) : (
        <Spinner />
      )}
    </>
  );
};
