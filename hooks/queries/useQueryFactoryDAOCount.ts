import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';

import {
  DAOFactory__factory,
} from '../../types/ethers-contracts/factories/DAOFactory__factory';

export const useQueryFactoryDAOCount = (factoryAddress: `0x${string}`) => {
  const {
    data: daoCount,
    error,
    isLoading,
  }: {
    data?: BigNumber;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address: factoryAddress,
    abi: DAOFactory__factory.abi,
    functionName: "getDAOCount",
  });

  return { daoCount, error, isLoading };
};
