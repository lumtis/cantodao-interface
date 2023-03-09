import {
  erc20ABI,
  useContractRead,
} from 'wagmi';

const useQueryTokenAllowance = (
  holderAddress?: string,
  spenderAddress?: string,
  contractAddress?: string
) => {
  const address = contractAddress as `0x${string}`;

  const {
    data: allowance,
    error,
    isLoading,
  } = useContractRead({
    address,
    abi: erc20ABI,
    functionName: "allowance",
    args: [holderAddress as `0x${string}`, spenderAddress as `0x${string}`],
  });

  return { allowance, error, isLoading };
};

export default useQueryTokenAllowance;
