import { BigNumber } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import DAOFactory from "../../abis/DAOFactory.json";
import { GetDaoFactoryAddress } from "../../config/addresses";

const useTxCreateDAO = (
  daoName: string,
  imageURL: string,
  tokenName: string,
  tokenSymbol: string,
  tokenSupply: BigNumber
) => {
  const { config } = usePrepareContractWrite({
    address: GetDaoFactoryAddress(),
    abi: DAOFactory.abi,
    functionName: "createDAO",
    args: [daoName, imageURL, tokenName, tokenSymbol, tokenSupply],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
};

export default useTxCreateDAO;
