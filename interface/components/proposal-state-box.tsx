import { ProposalState, ProposalStateToString } from "../utils/proposal";
import Code from "./ui/code";

export const ProposalStateBox = ({
  proposalState,
}: {
  proposalState: ProposalState;
}) => {
  return <Code>{ProposalStateToString(proposalState)}</Code>;
};
