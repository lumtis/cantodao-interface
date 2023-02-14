import { ProposalState, ProposalStateToString } from "../utils/proposal";
import Code from "./ui/code";

export const ProposalStateBox = ({
  proposalState,
  ...props
}: {
  proposalState: ProposalState;
}) => {
  return <Code {...props}>{ProposalStateToString(proposalState)}</Code>;
};
