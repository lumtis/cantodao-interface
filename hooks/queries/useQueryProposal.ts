import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";

import DAOGovernor from "../../abis/DAOGovernor.json";
import { Proposal } from "../../types/proposal";

const useQueryProposal = (
  contractAddress?: string,
  proposalId?: BigNumber
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
    abi: DAOGovernor.abi,
    functionName: "proposals",
    args: [proposalId || 0],
  });

  return { proposal, error, isLoading };
};

export default useQueryProposal;
