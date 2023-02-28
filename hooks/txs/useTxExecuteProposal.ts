import { utils } from 'ethers';
import {
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

import { DAOGovernor__factory } from '../../types/ethers-contracts';
import { ProposalContent } from '../../types/proposal';

const useTxExecuteProposal = (
  proposalContent: ProposalContent,
  contractAddress: string
) => {
  const address = contractAddress as `0x${string}`;
  const abi = DAOGovernor__factory.abi;
  const descriptionHash = utils.id(proposalContent.description);

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: "execute",
    args: [
      proposalContent.targetAddress as `0x${string}`[],
      proposalContent.amount,
      proposalContent.calldata as `0x${string}`[],
      descriptionHash as `0x${string}`,
    ],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
};

export default useTxExecuteProposal;
