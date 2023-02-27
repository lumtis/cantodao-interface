import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';

import { DAOToken__factory } from '../../types/ethers-contracts';

const useQueryPastTotalSupply = (
  blockNumber: BigNumber,
  contractAddress?: string
): {
  pastTotalSupply?: BigNumber;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data: pastTotalSupply,
    error,
    isLoading,
  }: {
    data?: BigNumber;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: DAOToken__factory.abi,
    functionName: "getPastTotalSupply",
    args: [blockNumber],
  });

  return { pastTotalSupply, error, isLoading };
};

export default useQueryPastTotalSupply;
