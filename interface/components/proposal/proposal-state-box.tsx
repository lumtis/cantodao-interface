import { Text } from "@chakra-ui/react";

import { ProposalState, ProposalStateToString } from "../../utils/proposal";

export const ProposalStateBox = ({
  proposalState,
  ...props
}: {
  proposalState: ProposalState;
}) => {
  return <Text {...props}>{ProposalStateToString(proposalState)}</Text>;
};
