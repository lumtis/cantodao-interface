import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";

import DAOGovernor from "../../abis/DAOGovernor.json";
import { ProposalState } from "../../utils/proposal";

const useQueryProposalState = (
  contractAddress?: string,
  proposalId?: BigNumber
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
    abi: DAOGovernor.abi,
    functionName: "state",
    args: [proposalId || 0],
  });

  return { proposalState, error, isLoading };
};

export default useQueryProposalState;
