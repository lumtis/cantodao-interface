import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";

import DAOGovernor from "../../abis/DAOGovernor.json";

const useQueryProposalContent = (
  contractAddress?: string,
  proposalId?: BigNumber
): {
  data?: any;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data,
    error,
    isLoading,
  }: {
    data?: any;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: DAOGovernor.abi,
    functionName: "getProposalContent",
    args: [proposalId || 0],
  });

  return { data, error, isLoading };
};

export default useQueryProposalContent;
