import { useState } from 'react';

import {
  BigNumber,
  utils,
} from 'ethers';

import {
  Box,
  Radio,
  RadioGroup,
  Spinner,
  Text,
} from '@chakra-ui/react';

import useQueryHasVoted from '../../hooks/queries/useQueryHasVoted';
import useQueryPastAvailableVotes
  from '../../hooks/queries/useQueryPastAvailableVotes';
import useTxCastVote from '../../hooks/txs/ustTxCastVote';
import useAccountWrapped from '../../hooks/useAccount';
import { DAOInfo } from '../../types/dao';
import { NullAddress } from '../../types/evm';
import {
  Proposal,
  Vote,
} from '../../types/proposal';
import { DAOTokenDecimals } from '../../types/token';
import { TxInfo } from '../tx/tx-info';
import Button from '../ui/button';
import ContainerSpaced from '../ui/container-spaced';

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
  } = useQueryHasVoted(proposalID, address, daoAddress);

  const {
    votes,
    error: errorAvailableVotes,
    isLoading: isLoadingAvailableVotes,
  } = useQueryPastAvailableVotes(
    address || NullAddress,
    proposal.startBlock,
    daoInfo?.token
  );

  const [selectedVote, setSelectedVote] = useState("for");

  const {
    data,
    isLoading: isLoadingTx,
    isSuccess: isSuccessTx,
    write,
  } = useTxCastVote(proposalID, convertVote(selectedVote), daoAddress);
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
        <Text>You have no voting power for this proposal</Text>
        <Text>
          NOte: If you got voting power after proposal start time, those are not
          available for this one
        </Text>
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
        <Text>
          You have a voting power of{" "}
          {utils.formatUnits(votes, DAOTokenDecimals)} vote(s)
        </Text>
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
