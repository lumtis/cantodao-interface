import { BigNumber } from 'ethers';

import {
  Box,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';

import useQueryCSRBalance from '../../hooks/queries/useQueryCSRBalance';

export const CSRInfo = ({
  csrContract,
  tokenId,
}: {
  csrContract: string;
  tokenId: BigNumber;
}) => {
  const { balance, error, isLoading } = useQueryCSRBalance(
    tokenId,
    csrContract
  );

  return (
    <>
      {!isLoading && !error && balance ? (
        <Box display="flex" flexDirection="row" alignItems="flex-start">
          <Heading>#{tokenId.toString()}</Heading>
          <Text ml="auto">{"⋐" + balance?.toString()}</Text>
        </Box>
      ) : (
        <Spinner />
      )}
    </>
  );
};
