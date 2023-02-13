import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";

import DAOGovernor from "../../abis/DAOGovernor.json";

const useQueryProposalID = (
  contractAddress?: string,
  proposalIndex?: BigNumber
): {
  proposalID?: BigNumber;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data: proposalID,
    error,
    isLoading,
  }: {
    data?: BigNumber;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: DAOGovernor.abi,
    functionName: "proposalIDs",
    args: [proposalIndex || 0],
  });

  return { proposalID, error, isLoading };
};

export default useQueryProposalID;
