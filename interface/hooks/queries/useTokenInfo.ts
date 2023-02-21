import { BigNumber } from "ethers";
import { erc20ABI, useContractReads } from "wagmi";

import { TokenInfo } from "../../utils/token";

// Query general information of the token
const useQueryTokenInfo = (contractAddress?: string) => {
  const address = contractAddress as `0x${string}`;

  const { data, error, isLoading } = useContractReads({
    contracts: [
      {
        address,
        abi: erc20ABI,
        functionName: "name",
      },
      {
        address,
        abi: erc20ABI,
        functionName: "symbol",
      },
      {
        address,
        abi: erc20ABI,
        functionName: "totalSupply",
      },
      {
        address,
        abi: erc20ABI,
        functionName: "decimals",
      },
    ],
  });

  const tokenInfo: TokenInfo = {
    name: data?.[0] as string,
    symbol: data?.[1] as string,
    totalSupply: data?.[2] as BigNumber,
    decimals: data?.[3],
  };

  return { tokenInfo, error, isLoading };
};

export default useQueryTokenInfo;
