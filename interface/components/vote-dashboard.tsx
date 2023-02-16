import { useState } from "react";

import { BigNumber } from "ethers";

import { Box, Radio, RadioGroup, Spinner, Text } from "@chakra-ui/react";

import useQueryHasVoted from "../hooks/queries/useQueryHasVoted";
import useQueryPastAvailableVotes from "../hooks/queries/useQueryPastAvailableVotes";
import useTxCastVote from "../hooks/txs/ustTxCastVote";
import useAccountWrapped from "../hooks/useAccount";
import { DAOInfo } from "../utils/dao";
import { Proposal, Vote } from "../utils/proposal";
import { TxInfo } from "./tx/tx-info";
import Button from "./ui/button";
import ContainerSpaced from "./ui/container-spaced";

export const VoteDashboard = ({
  proposal,
  daoAddress,
  daoInfo,
  proposalID,
}: {
  proposal: Proposal;
  daoAddress: string;
  daoInfo: DAOInfo;
  proposalID: BigNumber;
}) => {
  const { address, isConnected } = useAccountWrapped();

  const {
    voted,
    error: errorVoted,
    isLoading: isLoadingVoted,
  } = useQueryHasVoted(daoAddress, proposalID, address);

  const {
    votes,
    error: errorAvailableVotes,
    isLoading: isLoadingAvailableVotes,
  } = useQueryPastAvailableVotes(daoInfo?.token, address, proposal.startBlock);

  const [selectedVote, setSelectedVote] = useState("for");

  const {
    data,
    isLoading: isLoadingTx,
    isSuccess: isSuccessTx,
    write,
  } = useTxCastVote(daoAddress, proposalID, convertVote(selectedVote));
  const txHash = data?.hash;

  // Already voted
  if (isConnected && !errorVoted && !isLoadingVoted && voted) {
    return (
      <ContainerSpaced>
        <Text>You have already voted on this proposal</Text>
      </ContainerSpaced>
    );
  }

  // No voting power
  if (
    isConnected &&
    !errorAvailableVotes &&
    !isLoadingAvailableVotes &&
    votes &&
    votes.isZero()
  ) {
    return (
      <ContainerSpaced>
        <Text>You have no voting power</Text>
      </ContainerSpaced>
    );
  }

  // Voting power and not yet voted
  if (
    isConnected &&
    !errorVoted &&
    !isLoadingVoted &&
    !voted &&
    !errorAvailableVotes &&
    !isLoadingAvailableVotes &&
    votes &&
    !votes.isZero()
  ) {
    return (
      <ContainerSpaced>
        <Text>You have a voting power of {votes.toString()} vote(s)</Text>
        <Text>Select a vote:</Text>
        <RadioGroup
          value={selectedVote}
          onChange={(newValue: string) => {
            setSelectedVote(newValue);
          }}
        >
          <Box>
            <RadioW value="for" text="For" />
          </Box>
          <Box>
            <RadioW value="against" text="Against" />
          </Box>
          <Box>
            <RadioW value="abstain" text="Abstain" />
          </Box>
        </RadioGroup>
        {!isSuccessTx && !txHash && !isLoadingTx && (
          <Button w="fit-content" disabled={!write} onClick={() => write?.()}>
            Cast Vote
          </Button>
        )}
        <TxInfo
          isLoadingTx={isLoadingTx}
          isSuccessTx={isSuccessTx}
          txHash={txHash}
        />
      </ContainerSpaced>
    );
  }

  return <Spinner />;
};

// TODO: Use Chakra theme for the Radio styles
const RadioW = ({ value, text }: { value: string; text: string }) => {
  return (
    <Box>
      <Radio
        value={value}
        borderColor="primary"
        _checked={{ bg: "primarydark", borderColor: "primary" }}
      >
        <Text>{text}</Text>
      </Radio>
    </Box>
  );
};

const convertVote = (vote: string): Vote => {
  if (vote === "for") {
    return Vote.For;
  } else if (vote === "against") {
    return Vote.Against;
  } else {
    return Vote.Abstain;
  }
};
