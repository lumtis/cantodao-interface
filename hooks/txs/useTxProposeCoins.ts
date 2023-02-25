import { BigNumber } from "ethers";

import useTxPropose from "./useTxPropose";

const useTxProposeTransferCoins = (
  contractAddress: string,
  recipient: string,
  amount: BigNumber,
  description: string
) => {
  const { data, isLoading, isSuccess, write } = useTxPropose(
    contractAddress,
    recipient,
    amount,
    "0x",
    description
  );

  return { data, isLoading, isSuccess, write };
};

export default useTxProposeTransferCoins;
