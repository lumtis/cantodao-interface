import { BigNumber, utils } from "ethers";

import { Box, Heading, Text } from "@chakra-ui/react";

import { blockTime } from "../../config/chain";
import { BlockIntervalToTime } from "../../types/evm";
import { Proposal, ProposalContent, ProposalState } from "../../types/proposal";
import ContainerSpaced from "../ui/container-spaced";
import { CopyCard } from "../ui/copy-card";
import { ProposalStateBox } from "./proposal-state-box";

export const ProposalInfo = ({
  proposal,
  proposalID,
  proposalState,
  proposalContent,
  blockNumber,
}: {
  proposal: Proposal;
  proposalID: BigNumber;
  proposalState: ProposalState;
  proposalContent: ProposalContent;
  blockNumber: number;
}) => {
  // Get amount to be sent
  const amount = proposalContent?.amount?.[0];
  const amountStr = amount ? utils.formatEther(amount) : "";

  // Get start time
  const startTime = BlockIntervalToTime(
    blockNumber,
    proposal.startBlock.toNumber(),
    blockTime
  );

  // Get end time
  const endTime = BlockIntervalToTime(
    blockNumber,
    proposal.endBlock.toNumber(),
    blockTime
  );

  let calldata = proposalContent?.calldata?.[0]?.toString();
  if (calldata === "0x") {
    calldata += " (simple transfer)";
  }

  return (
    <ContainerSpaced>
      <Heading>Info:</Heading>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Text mr={4}>Proposal ID:</Text>
        <CopyCard address={proposalID?.toString()} />
      </Box>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Text mr={4}>State: </Text>
        <ProposalStateBox proposalState={proposalState} />
      </Box>
      <Text>Description: {proposalContent?.description}</Text>
      <Text>Start time: {startTime}</Text>
      <Text>End time: {endTime}</Text>
      <Heading>Action:</Heading>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Text mr={4}>Target address:</Text>
        <CopyCard address={proposalContent?.targetAddress?.[0]} />
      </Box>
      <Text>Amount: {amountStr}</Text>
      <Text>Calldata: {calldata}</Text>
    </ContainerSpaced>
  );
};
