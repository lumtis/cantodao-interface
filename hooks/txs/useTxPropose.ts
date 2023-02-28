import {
  BigNumber,
  BytesLike,
} from 'ethers';
import {
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

import { DAOProposer__factory } from '../../types/ethers-contracts';

const useTxPropose = (
  targetAddress: string,
  amount: BigNumber,
  calldata: BytesLike,
  description: string,
  contractAddress: string
) => {
  const address = contractAddress as `0x${string}`;
  const abi = DAOProposer__factory.abi;

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: "propose",
    args: [
      [targetAddress as `0x${string}`],
      [amount],
      [calldata as `0x${string}`],
      description,
    ],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
};

export default useTxPropose;
