import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";

import DAOFactory from "../../abis/DAOFactory.json";

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
    abi: DAOFactory.abi,
    functionName: "getDAOCount",
  });

  return { daoCount, error, isLoading };
};
