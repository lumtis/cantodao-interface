import { BigNumber } from "ethers";
import { erc20ABI, useContractReads } from "wagmi";

// Regular info of a DAO
export type TokenInfo = {
  name?: string;
  symbol?: string;
  totalSupply?: BigNumber;
};

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
    ],
  });

  const tokenInfo: TokenInfo = {
    name: data?.[0] as string,
    symbol: data?.[1] as string,
    totalSupply: data?.[2] as BigNumber,
  };

  return { tokenInfo, error, isLoading };
};

export default useQueryTokenInfo;
