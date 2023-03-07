import { BigNumber } from 'ethers';
import {
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

import { GetDaoFactoryAddress } from '../../config/addresses';
import {
  DAOFactory__factory,
} from '../../types/ethers-contracts/factories/DAOFactory__factory';

const useTxCreateDAOExistingToken = (
  daoName: string,
  daoDescription: string,
  imageURL: string,
  tokenName: string,
  tokenSymbol: string,
  assetToken: string,
  quorumFraction: BigNumber,
  votingDelay: BigNumber,
  votingPeriod: BigNumber,
  minimalVotingPower: BigNumber
) => {
  const { config } = usePrepareContractWrite({
    address: GetDaoFactoryAddress(),
    abi: DAOFactory__factory.abi,
    functionName: "createDAOExistingToken",
    args: [
      {
        name: daoName,
        description: daoDescription,
        image: imageURL,
      },
      {
        name: tokenName,
        symbol: tokenSymbol,
        assetToken: assetToken as `0x${string}`,
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

export default useTxCreateDAOExistingToken;
