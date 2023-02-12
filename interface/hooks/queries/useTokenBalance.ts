import { erc20ABI, useContractRead } from "wagmi";

const useQueryTokenBalance = (
  contractAddress?: string,
  holderAddress?: string
) => {
  const address = contractAddress as `0x${string}`;

  const {
    data: balance,
    error,
    isLoading,
  } = useContractRead({
    address,
    abi: erc20ABI,
    functionName: "balanceOf",
    args: [holderAddress as `0x${string}`],
  });

  return { balance, error, isLoading };
};

export default useQueryTokenBalance;
