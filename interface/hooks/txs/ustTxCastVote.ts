import { BigNumber } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import DAOGovernor from "../../abis/DAOGovernor.json";
import { Vote } from "../../utils/proposal";

const useTxCastVote = (
  contractAddress?: string,
  proposalID?: BigNumber,
  vote?: Vote
) => {
  const address = contractAddress as `0x${string}`;
  const abi = DAOGovernor.abi;

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: "castVote",
    args: [proposalID, vote],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
};

export default useTxCastVote;
