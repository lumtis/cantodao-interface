import { BigNumber } from 'ethers';
import {
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

import { GetDaoFactoryAddress } from '../../config/addresses';
import {
  DAOFactory__factory,
} from '../../types/ethers-contracts/factories/DAOFactory__factory';

const useTxCreateDAO = (
  daoName: string,
  imageURL: string,
  tokenName: string,
  tokenSymbol: string,
  tokenSupply: BigNumber
) => {
  const { config } = usePrepareContractWrite({
    address: GetDaoFactoryAddress(),
    abi: DAOFactory__factory.abi,
    functionName: "createDAO",
    args: [daoName, imageURL, tokenName, tokenSymbol, tokenSupply],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
};

export default useTxCreateDAO;
