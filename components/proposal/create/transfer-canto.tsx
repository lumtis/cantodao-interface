import { useState } from 'react';

import { ethers } from 'ethers';

import {
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';

import { NativeToken } from '../../../config/chain';
import useTxProposeTransferCoins
  from '../../../hooks/txs/useTxProposeTransferCoins';
import { NullAddress } from '../../../types/evm';
import { TxInfo } from '../../tx/tx-info';
import Button from '../../ui/button';
import ContainerSpaced from '../../ui/container-spaced';
import Input from '../../ui/input';

export const CreateProposalTransferCanto = ({
  proposerAddress,
}: {
  proposerAddress: string;
}) => {
  // Form inputs
  const [recipient, setRecipient] = useState(NullAddress);
  const [amount, setAmount] = useState("0");
  const [description, setDescription] = useState("A new transfer proposal");

  const {
    data,
    isLoading: isLoadingTx,
    isSuccess: isSuccessTx,
    write,
  } = useTxProposeTransferCoins(
    recipient,
    ethers.utils.parseEther(amount),
    description,
    proposerAddress
  );
  const txHash = data?.hash;

  return (
    <ContainerSpaced spacing={8}>
      <Heading m={4}>Canto transfer</Heading>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Text>Recipient: </Text>
        <Input
          ml="auto"
          id="recipient"
          name="recipient"
          value={recipient}
          onChange={(event: any) => setRecipient(event.target.value)}
        />
      </Box>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Text marginRight={4}>Amount({NativeToken}): </Text>
        <Input
          ml="auto"
          type="number"
          id="amount"
          name="amount"
          step="any"
          value={amount}
          onChange={(event: any) => setAmount(event.target.value || "0")}
        />
      </Box>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Text>Description: </Text>
        <Input
          ml="auto"
          id="description"
          name="description"
          value={description}
          onChange={(event: any) => setDescription(event.target.value)}
        />
      </Box>
      {!isSuccessTx && !txHash && !isLoadingTx && (
        <Button disabled={!write} onClick={() => write?.()}>
          Create proposal
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
