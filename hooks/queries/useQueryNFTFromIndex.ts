import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';

// TODO: update with ERC721 ABI
import {
  Turnstile__factory,
} from '../../types/ethers-contracts/factories/Turnstile__factory';
import { NullAddress } from '../../types/evm';

const useQueryNFTFromIndex = (
  holder?: string,
  index?: BigNumber,
  contractAddress?: string
): {
  tokenId?: BigNumber;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data: tokenId,
    error,
    isLoading,
  }: {
    data?: BigNumber;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: Turnstile__factory.abi,
    functionName: "tokenOfOwnerByIndex",
    args: [
      (holder as `0x${string}`) || NullAddress,
      index || BigNumber.from(0),
    ],
  });

  return { tokenId, error, isLoading };
};

export default useQueryNFTFromIndex;
