import { BigNumber } from 'ethers';
import Link from 'next/link';

import {
  Box,
  Heading,
  Spinner,
} from '@chakra-ui/react';

import useQueryProposalID from '../../hooks/queries/useQueryProposalID';
import useQueryProposalState from '../../hooks/queries/useQueryProposalState';
import { ProposalState } from '../../types/proposal';
import BoxW from '../ui/box';
import { ProposalStateBox } from './proposal-state-box';

export const ProposalCard = ({
  governorContract,
  proposerContract,
  proposalIndex,
}: {
  governorContract?: string;
  proposerContract?: string;
  proposalIndex: BigNumber;
}) => {
  const { proposalID, error, isLoading } = useQueryProposalID(
    proposalIndex,
    proposerContract
  );
  let {
    proposalState,
    error: errorState,
    isLoading: isLoadingState,
  } = useQueryProposalState(proposalID, governorContract);

  const route = (dao: string, proposalIndex: BigNumber) => {
    return "/proposal/" + dao + "/" + proposalIndex.toString();
  };

  if (!proposalState) {
    proposalState = ProposalState.Pending;
  }

  return (
    <Link href={route(governorContract as string, proposalIndex)}>
      <BoxW
        m={4}
        _hover={{
          cursor: "pointer",
          bg: "primarydarkest",
        }}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <Heading mr={4}>{"#" + proposalIndex.toString()}</Heading>
          {!isLoadingState && !errorState ? (
            <ProposalStateBox proposalState={proposalState} />
          ) : (
            <Spinner />
          )}
        </Box>
      </BoxW>
    </Link>
  );
};
