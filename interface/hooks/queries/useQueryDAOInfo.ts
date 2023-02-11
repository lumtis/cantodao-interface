import { BigNumber } from "ethers";
import { useContractReads } from "wagmi";

import DAOGovernor from "../../abis/DAOGovernor.json";

// Regular info of a DAO
export type DAOInfo = {
  name?: string;
  quorumVotes?: BigNumber;
  proposalThreshold?: BigNumber;
  votingDelay?: BigNumber;
  votingPeriod?: BigNumber;
  token?: string;
  executor?: string;
};

// Query different info of the DAO
const useQueryDAOInfo = (contractAddress?: string) => {
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
        functionName: "timelock",
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
    executor: data?.[6] as string,
  };

  return { daoInfo, error, isLoading };
};

export default useQueryDAOInfo;
