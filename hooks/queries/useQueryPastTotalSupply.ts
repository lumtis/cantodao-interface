import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";

import DAOToken from "../../abis/DAOToken.json";

const useQueryPastTotalSupply = (
  contractAddress?: string,
  blockNumber?: BigNumber
): {
  pastTotalSupply?: BigNumber;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data: pastTotalSupply,
    error,
    isLoading,
  }: {
    data?: BigNumber;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: DAOToken.abi,
    functionName: "getPastTotalSupply",
    args: [blockNumber],
  });

  return { pastTotalSupply, error, isLoading };
};

export default useQueryPastTotalSupply;
