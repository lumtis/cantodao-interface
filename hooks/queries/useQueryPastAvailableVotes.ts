import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';

import { DAOToken__factory } from '../../types/ethers-contracts';

const useQueryPastAvailableVotes = (
  holderAddress: string,
  blockNumber: BigNumber,
  contractAddress?: string
): {
  votes?: BigNumber;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data: votes,
    error,
    isLoading,
  }: {
    data?: BigNumber;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: DAOToken__factory.abi,
    functionName: "getPastVotes",
    args: [holderAddress as `0x${string}`, blockNumber],
  });

  return { votes, error, isLoading };
};

export default useQueryPastAvailableVotes;
