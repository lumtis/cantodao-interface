import { useContractRead } from 'wagmi';

import {
  DAOWrappedToken__factory,
} from '../../types/ethers-contracts/factories/DAOWrappedToken__factory';

const useQueryWrappedTokenAsset = (
  contractAddress?: string
): {
  asset?: string;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data: asset,
    error,
    isLoading,
  }: {
    data?: string;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: DAOWrappedToken__factory.abi,
    functionName: "asset",
  });

  return { asset, error, isLoading };
};

export default useQueryWrappedTokenAsset;
