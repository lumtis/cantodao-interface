import { useState } from "react";

import { ethers } from "ethers";

import { Box, Heading, Text } from "@chakra-ui/react";

import { GetNoteAddress } from "../../../config/addresses";
import useTxProposeTokens from "../../../hooks/txs/useTxProposeTokens";
import { NullAddress } from "../../../utils/evm";
import { TokenSelector } from "../../token-selector";
import { TxInfo } from "../../tx/tx-info";
import Button from "../../ui/button";
import ContainerSpaced from "../../ui/container-spaced";
import Input from "../../ui/input";

export const CreateProposalTransferTokens = ({
  proposerAddress,
}: {
  proposerAddress: string;
}) => {
  // Form inputs
  const [recipient, setRecipient] = useState(NullAddress);
  const [amount, setAmount] = useState("0");
  const [description, setDescription] = useState("A new transfer proposal");
  const [token, setToken] = useState<string>(GetNoteAddress());

  const {
    data,
    isLoading: isLoadingTx,
    isSuccess: isSuccessTx,
    write,
  } = useTxProposeTokens(
    proposerAddress,
    token,
    recipient,
    ethers.utils.parseEther(amount),
    description
  );
  const txHash = data?.hash;

  return (
    <ContainerSpaced spacing={8}>
      <Heading m={4}>Tokens transfer</Heading>
      <Text>ERC20 token address:</Text>
      <TokenSelector tokens={[]} setToken={setToken} />
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
        <Text marginRight={4}>Amount: </Text>
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
        <Text marginRight={4}>Description: </Text>
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
