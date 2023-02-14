// Mirror of proposal states from IGovernor
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
