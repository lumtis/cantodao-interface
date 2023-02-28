import { BigNumber } from 'ethers';
import { useContractReads } from 'wagmi';

import { DAOGovernor__factory } from '../../types/ethers-contracts';
import { Proposal } from '../../types/proposal';

const useQueryProposal = (
  proposalId?: BigNumber,
  contractAddress?: string
): {
  proposal?: Proposal;
  error: Error | null;
  isLoading: boolean;
} => {
  const abi = DAOGovernor__factory.abi;
  const address = contractAddress as `0x${string}`;

  const { data, error, isLoading } = useContractReads({
    contracts: [
      {
        address,
        abi,
        functionName: "proposalVotes",
        args: [proposalId || BigNumber.from(0)],
      },
      {
        address,
        abi,
        functionName: "proposalSnapshot",
        args: [proposalId || BigNumber.from(0)],
      },
      {
        address,
        abi,
        functionName: "proposalDeadline",
        args: [proposalId || BigNumber.from(0)],
      },
    ],
  });

  const proposal = {
    forVotes: data?.[0]?.forVotes || BigNumber.from(0),
    againstVotes: data?.[0]?.againstVotes || BigNumber.from(0),
    abstainVotes: data?.[0]?.abstainVotes || BigNumber.from(0),
    startBlock: data?.[1] || BigNumber.from(0),
    endBlock: data?.[2] || BigNumber.from(0),
  };

  return { proposal, error, isLoading };
};

export default useQueryProposal;
