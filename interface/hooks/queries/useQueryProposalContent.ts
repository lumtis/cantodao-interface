import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";

import DAOProposer from "../../abis/DAOProposer.json";
import { NewProposalContent, ProposalContent } from "../../utils/proposal";

const useQueryProposalContent = (
  contractAddress?: string,
  proposalId?: BigNumber
): {
  proposalContent?: ProposalContent;
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
    abi: DAOProposer.abi,
    functionName: "getProposalContent",
    args: [proposalId || 0],
  });

  const proposalContent = NewProposalContent(
    data?.[0],
    data?.[1],
    data?.[2],
    data?.[3]
  );

  return { proposalContent, error, isLoading };
};

export default useQueryProposalContent;
