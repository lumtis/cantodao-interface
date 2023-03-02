import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';

// TODO: update with ERC721 ABI
import {
  Turnstile__factory,
} from '../../types/ethers-contracts/factories/Turnstile__factory';
import { NullAddress } from '../../types/evm';

const useQueryNFTBalance = (
  holder?: string,
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
    functionName: "balanceOf",
    args: [(holder as `0x${string}`) || NullAddress],
  });

  return { balance, error, isLoading };
};

export default useQueryNFTBalance;
