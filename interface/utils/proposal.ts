import { BigNumber, BytesLike } from "ethers";

export enum ProposalType {
  TransferCanto,
  TransferTokens,
  MintGovernanceTokens,
}

export enum Vote {
  Against,
  For,
  Abstain,
}

export enum VoteState {
  NotStarted,
  InProgress,
  Ended,
}

export const VoteStateFromBlockNumber = (
  proposal: Proposal,
  blockNumber: number
): VoteState => {
  const bn = BigNumber.from(blockNumber);

  if (bn.lte(proposal.startBlock)) {
    return VoteState.NotStarted;
  } else if (bn.lte(proposal.endBlock)) {
    return VoteState.InProgress;
  } else {
    return VoteState.Ended;
  }
};

export enum ProposalState {
  Pending,
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed,
}

export const ProposalStateToString = (state: ProposalState): string => {
  switch (state) {
    case ProposalState.Pending:
      return "Pending";
    case ProposalState.Active:
      return "Active";
    case ProposalState.Canceled:
      return "Canceled";
    case ProposalState.Defeated:
      return "Defeated";
    case ProposalState.Succeeded:
      return "Succeeded";
    case ProposalState.Queued:
      return "Queued";
    case ProposalState.Expired:
      return "Expired";
    case ProposalState.Executed:
      return "Executed";
  }
};

// The action associated with a proposal
export type ProposalContent = {
  targetAddress: string[];
  amount: BigNumber[];
  calldata: BytesLike[];
  description: string;
};

export const NewProposalContent = (
  targetAddress: string[],
  amount: BigNumber[],
  calldata: BytesLike[],
  description: string
): ProposalContent => {
  return {
    targetAddress,
    amount,
    calldata,
    description,
  };
};

export const ProposalActionCount = (
  proposalContent: ProposalContent
): number => {
  return proposalContent.targetAddress.length;
};

// The general information associated with a proposal
export type Proposal = {
  id: BigNumber;
  proposer: string;
  startBlock: BigNumber;
  endBlock: BigNumber;
  forVotes: BigNumber;
  againstVotes: BigNumber;
  abstainVotes: BigNumber;
  canceled: boolean;
  executed: boolean;
  eta: BigNumber;
};
