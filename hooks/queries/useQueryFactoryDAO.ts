import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';

import { DAOFactory__factory } from '../../types/ethers-contracts';

export const useQueryFactoryDAO = (
  daoIndex: BigNumber,
  factoryAddress: `0x${string}`
) => {
  const {
    data: daoAddress,
    error,
    isLoading,
  }: {
    data?: string;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address: factoryAddress,
    abi: DAOFactory__factory.abi,
    functionName: "getDAO",
    args: [daoIndex],
  });

  return { daoAddress, error, isLoading };
};
