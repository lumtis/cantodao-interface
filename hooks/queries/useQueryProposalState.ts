import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';

import {
  DAOGovernor__factory,
} from '../../types/ethers-contracts/factories/DAOGovernor__factory';
import { ProposalState } from '../../types/proposal';

const useQueryProposalState = (
  proposalId?: BigNumber,
  contractAddress?: string
): {
  proposalState?: ProposalState;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data: proposalState,
    error,
    isLoading,
  }: {
    data?: ProposalState;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: DAOGovernor__factory.abi,
    functionName: "state",
    args: [proposalId || BigNumber.from(0)],
  });

  return { proposalState, error, isLoading };
};

export default useQueryProposalState;
