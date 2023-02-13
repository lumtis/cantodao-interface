import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";

import DAOToken from "../../abis/DAOToken.json";

const useQueryAvailableVotes = (
  contractAddress?: string,
  holderAddress?: string
): {
  votes?: BigNumber;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data: votes,
    error,
    isLoading,
  }: {
    data?: BigNumber;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: DAOToken.abi,
    functionName: "getVotes",
    args: [holderAddress],
  });

  return { votes, error, isLoading };
};

export default useQueryAvailableVotes;
