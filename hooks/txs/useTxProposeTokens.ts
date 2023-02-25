import { BigNumber, utils } from "ethers";
import { erc20ABI } from "wagmi";

import useTxPropose from "./useTxPropose";

const useTxProposeTransferTokens = (
  contractAddress: string,
  tokenAddress: string,
  recipient: string,
  amount: BigNumber,
  description: string
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
    contractAddress,
    tokenAddress,
    BigNumber.from(0),
    transferCalldata,
    description
  );

  return { data, isLoading, isSuccess, write };
};

export default useTxProposeTransferTokens;
