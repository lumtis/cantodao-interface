import { BigNumber } from 'ethers';
import {
  erc20ABI,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

const useTxTransferTokens = (
  targetAddress: string,
  amount: BigNumber,
  contractAddress?: string
) => {
  const address = contractAddress as `0x${string}`;
  const abi = erc20ABI;

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: "transfer",
    args: [targetAddress as `0x${string}`, amount],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
};

export default useTxTransferTokens;
