import { Text } from '@chakra-ui/react';

import useTxExecuteProposal from '../../hooks/txs/useTxExecuteProposal';
import {
  ProposalContent,
  ProposalState,
} from '../../types/proposal';
import { TxInfo } from '../tx/tx-info';
import Button from '../ui/button';
import ContainerSpaced from '../ui/container-spaced';

export const ExecutionDashboard = ({
  daoAddress,
  proposalState,
  proposalContent,
}: {
  daoAddress: string;
  proposalState: ProposalState;
  proposalContent: ProposalContent;
}) => {
  var content = null;
  switch (proposalState) {
    case ProposalState.Canceled:
      content = <Text>The proposal has been canceled</Text>;
      break;
    case ProposalState.Defeated:
      content = <Text>The proposal has been rejected</Text>;
      break;
    case ProposalState.Expired:
      content = <Text>The proposal is expired</Text>;
      break;
    case ProposalState.Executed:
      content = <Text>The proposal has been executed</Text>;
      break;
    case ProposalState.Succeeded:
    case ProposalState.Queued:
      content = (
        <ExecuteDashboard
          daoAddress={daoAddress}
          proposalContent={proposalContent}
        />
      );
      break;
    default:
      content = <Text>The proposal is not ended</Text>;
      break;
  }

  return <ContainerSpaced>{content}</ContainerSpaced>;
};

const ExecuteDashboard = ({
  daoAddress,
  proposalContent,
}: {
  daoAddress: string;
  proposalContent: ProposalContent;
}) => {
  const {
    data,
    isLoading: isLoadingTx,
    isSuccess: isSuccessTx,
    write,
  } = useTxExecuteProposal(proposalContent, daoAddress);
  const txHash = data?.hash;

  return (
    <ContainerSpaced>
      <Text>The proposal has been approved and must be now executed</Text>
      {!isSuccessTx && !txHash && !isLoadingTx && (
        <Button disabled={!write} onClick={() => write?.()}>
          Execute proposal
        </Button>
      )}
      <TxInfo
        isLoadingTx={isLoadingTx}
        isSuccessTx={isSuccessTx}
        txHash={txHash}
      />
    </ContainerSpaced>
  );
};
