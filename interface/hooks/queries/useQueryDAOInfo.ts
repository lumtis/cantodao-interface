import { BigNumber } from "ethers";
import { useContractReads } from "wagmi";

import DAOGovernor from "../../abis/DAOGovernor.json";

type DAOInfo = {
  name?: string;
  quorumVotes?: BigNumber;
  proposalThreshold?: BigNumber;
  votingDelay?: BigNumber;
  votingPeriod?: BigNumber;
};

// Query different info of the DAO, including name, quorum, etc...
const useQueryDAOInfo = (contractAddress: string) => {
  const abi = DAOGovernor.abi;
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
        abi: DAOGovernor.abi,
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
    ],
  });

  const daoInfo: DAOInfo = {
    name: data?.[0] as string,
    quorumVotes: data?.[1] as BigNumber,
    proposalThreshold: data?.[2] as BigNumber,
    votingDelay: data?.[3] as BigNumber,
    votingPeriod: data?.[4] as BigNumber,
  };

  return { daoInfo, error, isLoading };
};

export default useQueryDAOInfo;
