import { BigNumber } from "ethers";

import { Box, Heading, Text } from "@chakra-ui/react";

import { Proposal, ProposalContent, ProposalState } from "../utils/proposal";
import { ProposalStateBox } from "./proposal-state-box";
import ContainerSpaced from "./ui/container-spaced";
import { CopyCard } from "./ui/copy-card";

export const ProposalInfo = ({
  proposal,
  proposalID,
  proposalState,
  proposalContent,
}: {
  proposal: Proposal;
  proposalID: BigNumber;
  proposalState: ProposalState;
  proposalContent: ProposalContent;
}) => {
  return (
    <ContainerSpaced>
      <Heading>Info:</Heading>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Text>Proposal ID:</Text>
        <CopyCard address={proposalID?.toString()} />
      </Box>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Text>State: </Text>
        <ProposalStateBox proposalState={proposalState} />
      </Box>
      <Text>Description: {proposalContent?.description}</Text>

      <Heading>Action:</Heading>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Text>Target address:</Text>
        <CopyCard address={proposalContent?.targetAddress?.[0]} />
      </Box>
      <Text>Amount: {proposalContent?.amount?.[0]?.toString()}</Text>
      <Text>Calldata: {proposalContent?.calldata?.[0]?.toString()}</Text>
    </ContainerSpaced>
  );
};
