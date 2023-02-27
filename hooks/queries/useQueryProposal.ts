import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';

import { DAOGovernor__factory } from '../../types/ethers-contracts';
import { Proposal } from '../../types/proposal';

const useQueryProposal = (
  proposalId?: BigNumber,
  contractAddress?: string
): {
  proposal?: Proposal;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data: proposal,
    error,
    isLoading,
  }: {
    data?: Proposal;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: DAOGovernor__factory.abi,
    functionName: "proposals",
    args: [proposalId || 0],
  });

  return { proposal, error, isLoading };
};

export default useQueryProposal;
