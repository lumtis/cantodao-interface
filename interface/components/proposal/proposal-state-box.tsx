import { Text } from '@chakra-ui/react';

import {
  ProposalState,
  ProposalStateToString,
} from '../../types/proposal';

export const ProposalStateBox = ({
  proposalState,
  ...props
}: {
  proposalState: ProposalState;
}) => {
  return (
    <Text fontSize="25px" {...props}>
      {ProposalStateToString(proposalState)}
    </Text>
  );
};
