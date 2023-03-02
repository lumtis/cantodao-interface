import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';

// TODO: update with ERC721 ABI
import {
  Turnstile__factory,
} from '../../types/ethers-contracts/factories/Turnstile__factory';

const useQueryCSRBalance = (
  tokenId?: BigNumber,
  contractAddress?: string
): {
  balance?: BigNumber;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data: balance,
    error,
    isLoading,
  }: {
    data?: BigNumber;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: Turnstile__factory.abi,
    functionName: "balances",
    args: [tokenId || BigNumber.from(0)],
  });

  return { balance, error, isLoading };
};

export default useQueryCSRBalance;
