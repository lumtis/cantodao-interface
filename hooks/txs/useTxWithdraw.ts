import { BigNumber } from 'ethers';
import {
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

import {
  DAOWrappedToken__factory,
} from '../../types/ethers-contracts/factories/DAOWrappedToken__factory';

const useTxWithdraw = (
  targetAddress: string,
  amount: BigNumber,
  contractAddress?: string
) => {
  const address = contractAddress as `0x${string}`;
  const abi = DAOWrappedToken__factory.abi;

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: "redeem",
    args: [
      amount,
      targetAddress as `0x${string}`,
      targetAddress as `0x${string}`,
    ],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
};

export default useTxWithdraw;
