import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";

import DAOProposer from "../../abis/DAOProposer.json";

const useQueryProposalCount = (
  contractAddress?: string
): {
  count?: BigNumber;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data: count,
    error,
    isLoading,
  }: {
    data?: BigNumber;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: DAOProposer.abi,
    functionName: "proposalCount",
  });

  return { count, error, isLoading };
};

export default useQueryProposalCount;
