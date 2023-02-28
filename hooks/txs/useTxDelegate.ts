import {
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

import { DAOToken__factory } from '../../types/ethers-contracts';

const useTxDelegate = (holderAddress: string, contractAddress?: string) => {
  const address = contractAddress as `0x${string}`;

  const { config } = usePrepareContractWrite({
    address,
    abi: DAOToken__factory.abi,
    functionName: "delegate",
    args: [holderAddress as `0x${string}`],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
};

export default useTxDelegate;
