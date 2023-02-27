import { BigNumber } from 'ethers';
import { useContractReads } from 'wagmi';

import { DAOInfo } from '../../types/dao';
import { DAOGovernor__factory } from '../../types/ethers-contracts';

// Query different info of the DAO
const useQueryDAOInfo = (contractAddress?: string) => {
  const abi = DAOGovernor__factory.abi;
  const address = contractAddress as `0x${string}`;

  const { data, error, isLoading } = useContractReads({
    contracts: [
      {
        address,
        abi,
        functionName: "name",
      },
      {
        address,
        abi,
        functionName: "quorumVotes",
      },
      {
        address,
        abi,
        functionName: "proposalThreshold",
      },
      {
        address,
        abi,
        functionName: "votingDelay",
      },
      {
        address,
        abi,
        functionName: "votingPeriod",
      },
      {
        address,
        abi,
        functionName: "token",
      },
      {
        address,
        abi,
        functionName: "proposer",
      },
      {
        address,
        abi,
        functionName: "imageURL",
      },
    ],
  });

  const daoInfo: DAOInfo = {
    name: data?.[0] as string,
    quorumVotes: data?.[1] as BigNumber,
    proposalThreshold: data?.[2] as BigNumber,
    votingDelay: data?.[3] as BigNumber,
    votingPeriod: data?.[4] as BigNumber,
    token: data?.[5] as string,
    proposer: data?.[6] as string,
    imageURL: data?.[7] as string,
  };

  return { daoInfo, error, isLoading };
};

export default useQueryDAOInfo;
