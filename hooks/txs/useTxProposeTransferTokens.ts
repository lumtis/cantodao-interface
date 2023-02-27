import {
  BigNumber,
  utils,
} from 'ethers';
import { erc20ABI } from 'wagmi';

import useTxPropose from './useTxPropose';

const useTxProposeTransferTokens = (
  tokenAddress: string,
  recipient: string,
  amount: BigNumber,
  description: string,
  contractAddress: string
) => {
  const iface = new utils.Interface(erc20ABI);
  let transferCalldata = "0x";

  try {
    transferCalldata = iface.encodeFunctionData("transfer", [
      recipient,
      amount,
    ]);
  } catch (_) {
    // Do nothing
  }

  const { data, isLoading, isSuccess, write } = useTxPropose(
    tokenAddress,
    BigNumber.from(0),
    transferCalldata,
    description,
    contractAddress
  );

  return { data, isLoading, isSuccess, write };
};

export default useTxProposeTransferTokens;
