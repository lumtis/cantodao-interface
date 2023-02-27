import { BigNumber } from 'ethers';

import useTxPropose from './useTxPropose';

const useTxProposeTransferCoins = (
  recipient: string,
  amount: BigNumber,
  description: string,
  contractAddress: string
) => {
  const { data, isLoading, isSuccess, write } = useTxPropose(
    recipient,
    amount,
    "0x",
    description,
    contractAddress
  );

  return { data, isLoading, isSuccess, write };
};

export default useTxProposeTransferCoins;
