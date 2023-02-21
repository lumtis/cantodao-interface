import { Text } from "@chakra-ui/react";

import { ProposalState, ProposalStateToString } from "../../types/proposal";

export const ProposalStateBox = ({
  proposalState,
  ...props
}: {
  proposalState: ProposalState;
}) => {
  return <Text {...props}>{ProposalStateToString(proposalState)}</Text>;
};
