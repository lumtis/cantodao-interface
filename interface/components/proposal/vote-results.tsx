import { Heading, Text } from "@chakra-ui/react";

import { Proposal } from "../../utils/proposal";
import ContainerSpaced from "../ui/container-spaced";

export const VoteResults = ({ proposal }: { proposal?: Proposal }) => {
  return (
    <ContainerSpaced>
      <Heading mr="auto">Votes:</Heading>
      <Text>For: {proposal?.forVotes?.toString()}</Text>
      <Text>Against: {proposal?.againstVotes?.toString()}</Text>
      <Text>Abstain: {proposal?.abstainVotes?.toString()}</Text>
    </ContainerSpaced>
  );
};
