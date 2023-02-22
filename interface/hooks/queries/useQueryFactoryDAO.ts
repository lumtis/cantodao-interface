import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";

import DAOFactory from "../../abis/DAOFactory.json";

export const useQueryFactoryDAO = (
  factoryAddress: `0x${string}`,
  daoIndex: BigNumber
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
    abi: DAOFactory.abi,
    functionName: "getDAO",
    args: [daoIndex],
  });

  return { daoAddress, error, isLoading };
};
