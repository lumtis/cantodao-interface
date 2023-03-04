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
  daoDescription: string,
  imageURL: string,
  tokenName: string,
  tokenSymbol: string,
  initialSupply: BigNumber,
  quorumFraction: BigNumber,
  votingDelay: BigNumber,
  votingPeriod: BigNumber
) => {
  const { config } = usePrepareContractWrite({
    address: GetDaoFactoryAddress(),
    abi: DAOFactory__factory.abi,
    functionName: "createDAO",
    args: [
      {
        name: daoName,
        description: daoDescription,
        image: imageURL,
      },
      {
        name: tokenName,
        symbol: tokenSymbol,
        initialSupply,
      },
      {
        quorumFraction,
        votingDelay,
        votingPeriod,
      },
    ],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
};

export default useTxCreateDAO;
