import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";

import DAOGovernor from "../../abis/DAOGovernor.json";
import { NullAddress } from "../../utils/evm";

const useQueryHasVoted = (
  contractAddress?: string,
  proposalId?: BigNumber,
  voter?: string
): {
  voted?: boolean;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data: voted,
    error,
    isLoading,
  }: {
    data?: boolean;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: DAOGovernor.abi,
    functionName: "hasVoted",
    args: [proposalId || 0, voter || NullAddress],
  });

  return { voted, error, isLoading };
};

export default useQueryHasVoted;
