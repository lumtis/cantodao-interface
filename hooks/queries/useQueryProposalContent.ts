import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';

import { DAOProposer__factory } from '../../types/ethers-contracts';
import {
  NewProposalContent,
  ProposalContent,
} from '../../types/proposal';

const useQueryProposalContent = (
  proposalId?: BigNumber,
  contractAddress?: string
): {
  proposalContent?: ProposalContent;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data,
    error,
    isLoading,
  }: {
    data?: any;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: DAOProposer__factory.abi,
    functionName: "getProposalContent",
    args: [proposalId || BigNumber.from(0)],
  });

  const proposalContent = NewProposalContent(
    data?.[0],
    data?.[1],
    data?.[2],
    data?.[3]
  );

  return { proposalContent, error, isLoading };
};

export default useQueryProposalContent;
