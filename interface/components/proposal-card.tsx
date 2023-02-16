import { BigNumber } from "ethers";

import { Box, Heading } from "@chakra-ui/react";

import useQueryProposalID from "../hooks/queries/useQueryProposalID";
import useQueryProposalState from "../hooks/queries/useQueryProposalState";
import { ProposalState } from "../utils/proposal";
import { ProposalStateBox } from "./proposal-state-box";
import BoxW from "./ui/box";
import { RouteCard } from "./ui/route-card";

export const ProposalCard = ({
  governorContract,
  proposerContract,
  proposalIndex,
}: {
  governorContract?: string;
  proposerContract?: string;
  proposalIndex: BigNumber;
}) => {
  const {
    proposalID,
    error: errorID,
    isLoading: isLoadingID,
  } = useQueryProposalID(proposerContract, proposalIndex);
  let {
    proposalState,
    error: errorState,
    isLoading: isLoadingState,
  } = useQueryProposalState(governorContract, proposalID);

  const route = (dao: string, proposalIndex: BigNumber) => {
    return "/proposal/" + dao + "/" + proposalIndex.toString();
  };

  if (!proposalState) {
    proposalState = ProposalState.Pending;
  }

  return (
    <BoxW margin={4}>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Heading mr={4}>{"#" + proposalIndex.toString()}</Heading>
        {!isLoadingID && !errorID && proposalID && (
          <Box mr={4}>
            <RouteCard
              cardText={proposalID.toString()}
              route={route(governorContract as string, proposalIndex)}
            />
          </Box>
        )}
        {!isLoadingState && !errorState && (
          <ProposalStateBox proposalState={proposalState} />
        )}
      </Box>
    </BoxW>
  );
};
