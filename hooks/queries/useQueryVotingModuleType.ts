import { useContractRead } from 'wagmi';

import { VotingModuleType } from '../../types/dao';
import { DAOToken__factory } from '../../types/ethers-contracts';

const useQueryVotingModuleType = (
  contractAddress?: string
): {
  votingModule?: VotingModuleType;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data,
    error,
    isLoading,
  }: {
    data?: number;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: DAOToken__factory.abi,
    functionName: "votingModuleType",
  });

  const votingModule = data as VotingModuleType;

  return { votingModule, error, isLoading };
};

export default useQueryVotingModuleType;
