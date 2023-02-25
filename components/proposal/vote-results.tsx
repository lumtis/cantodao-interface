import { utils } from "ethers";

import { Heading, Text } from "@chakra-ui/react";

import { Proposal } from "../../types/proposal";
import { DAOTokenDecimals } from "../../types/token";
import ContainerSpaced from "../ui/container-spaced";

export const VoteResults = ({ proposal }: { proposal?: Proposal }) => {
  return (
    <ContainerSpaced>
      <Heading mr="auto">Votes:</Heading>
      <Text>
        For:{" "}
        {proposal?.forVotes &&
          utils.formatUnits(proposal.forVotes, DAOTokenDecimals)}
      </Text>
      <Text>
        Against:{" "}
        {proposal?.againstVotes &&
          utils.formatUnits(proposal.againstVotes, DAOTokenDecimals)}
      </Text>
      <Text>
        Abstain:{" "}
        {proposal?.abstainVotes &&
          utils.formatUnits(proposal.abstainVotes, DAOTokenDecimals)}
      </Text>
    </ContainerSpaced>
  );
};
