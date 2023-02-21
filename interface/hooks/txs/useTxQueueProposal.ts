import { utils } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import DAOGovernor from "../../abis/DAOGovernor.json";
import { ProposalContent } from "../../types/proposal";

const useTxQueueProposal = (
  contractAddress: string,
  proposalContent: ProposalContent
) => {
  const address = contractAddress as `0x${string}`;
  const abi = DAOGovernor.abi;
  const descriptionHash = utils.id(proposalContent.description);

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: "queue(address[],uint256[],bytes[],bytes32)",
    args: [
      proposalContent.targetAddress,
      proposalContent.amount,
      proposalContent.calldata,
      descriptionHash,
    ],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
};

export default useTxQueueProposal;
