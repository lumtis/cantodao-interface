import { BigNumber } from 'ethers';
import {
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

import { GetDaoFactoryAddress } from '../../config/addresses';
import {
  DAOFactory__factory,
} from '../../types/ethers-contracts/factories/DAOFactory__factory';

const useTxCreateDAONewToken = (
  daoName: string,
  daoDescription: string,
  imageURL: string,
  tokenName: string,
  tokenSymbol: string,
  initialSupply: BigNumber,
  quorumFraction: BigNumber,
  votingDelay: BigNumber,
  votingPeriod: BigNumber,
  minimalVotingPower: BigNumber
) => {
  const { config } = usePrepareContractWrite({
    address: GetDaoFactoryAddress(),
    abi: DAOFactory__factory.abi,
    functionName: "createDAONewToken",
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
      {
        minimalVotingPower: minimalVotingPower,
      },
    ],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
};

export default useTxCreateDAONewToken;
