import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';

import { DAOGovernor__factory } from '../../types/ethers-contracts';

// useQueryQuorumVotes returns the number of votes necessary to reach quorum for a proposal
const useQueryQuorumVotes = (
  proposalId?: BigNumber,
  contractAddress?: string
): {
  quorumVotes?: BigNumber;
  error: Error | null;
  isLoading: boolean;
} => {
  const abi = DAOGovernor__factory.abi;
  const address = contractAddress as `0x${string}`;

  const {
    data: quorumVotes,
    error,
    isLoading,
  }: {
    data?: BigNumber;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi,
    functionName: "quorumVotes",
    args: [proposalId || BigNumber.from(0)],
  });

  return { quorumVotes, error, isLoading };
};

export default useQueryQuorumVotes;
