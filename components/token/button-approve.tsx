import { BigNumber } from 'ethers';

import { Box } from '@chakra-ui/react';

import useTxApproveTokens from '../../hooks/txs/useTxApproveTokens';
import { NullAddress } from '../../types/evm';
import { TxInfo } from '../tx/tx-info';
import Button from '../ui/button';

const MAX_UINT256 =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";

export const ApproveButton = ({
  contractAddress,
  spenderAddress,
}: {
  contractAddress?: string;
  spenderAddress?: string;
}) => {
  const { data, isSuccess, isLoading, write } = useTxApproveTokens(
    spenderAddress || NullAddress,
    BigNumber.from(MAX_UINT256),
    contractAddress
  );
  const txHash = data?.hash;

  return (
    <Box>
      {!isSuccess && !txHash && !isLoading && (
        <Button disabled={!write} onClick={() => write?.()}>
          Approve Token
        </Button>
      )}
      <TxInfo isLoadingTx={isLoading} isSuccessTx={isSuccess} txHash={txHash} />
    </Box>
  );
};
