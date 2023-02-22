import { useState } from "react";

import { Box, Heading, Spinner, Text } from "@chakra-ui/react";

import { GetNoteAddress } from "../../../config/addresses";
import useQueryDAOInfo from "../../../hooks/queries/useQueryDAOInfo";
import useQueryTokenInfo from "../../../hooks/queries/useTokenInfo";
import useTxProposeTokens from "../../../hooks/txs/useTxProposeTokens";
import { NullAddress } from "../../../types/evm";
import { ParseToken, TokenInfo } from "../../../types/token";
import { TokenSelector } from "../../token-selector";
import { TxInfo } from "../../tx/tx-info";
import Button from "../../ui/button";
import ContainerSpaced from "../../ui/container-spaced";
import Input from "../../ui/input";

export const CreateProposalTransferTokens = ({
  daoAddress,
}: {
  daoAddress: string;
}) => {
  // Form inputs
  const [recipient, setRecipient] = useState(NullAddress);
  const [amount, setAmount] = useState("0");
  const [description, setDescription] = useState("A new transfer proposal");

  const {
    daoInfo: daoInfo,
    error: errorInfo,
    isLoading: isLoadingInfo,
  } = useQueryDAOInfo(daoAddress);

  const {
    tokenInfo: daoTokenInfo,
    error: errorTokenInfo,
    isLoading: isLoadingTokenInfo,
  } = useQueryTokenInfo(daoInfo?.token);

  const {
    tokenInfo: noteTokenInfo,
    error: errorNoteTokenInfo,
    isLoading: isLoadingNoteTokenInfo,
  } = useQueryTokenInfo(GetNoteAddress());

  const [token, setToken] = useState<TokenInfo>(noteTokenInfo);

  const {
    data,
    isLoading: isLoadingTx,
    isSuccess: isSuccessTx,
    write,
  } = useTxProposeTokens(
    daoInfo?.proposer || "",
    token.address || "",
    recipient,
    ParseToken(amount, token.decimals || 18),
    description
  );
  const txHash = data?.hash;

  return (
    <ContainerSpaced spacing={8}>
      <Heading m={4}>Tokens transfer</Heading>
      {!errorInfo &&
      !isLoadingInfo &&
      !errorTokenInfo &&
      !isLoadingTokenInfo &&
      noteTokenInfo &&
      !errorNoteTokenInfo &&
      !isLoadingNoteTokenInfo &&
      daoTokenInfo ? (
        <>
          <Text>ERC20 token address:</Text>
          <TokenSelector
            tokens={[noteTokenInfo, daoTokenInfo]}
            setToken={setToken}
          />
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
            <Text marginRight={4}>
              {"Amount(" + (token?.symbol || "") + "): "}
            </Text>
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
        </>
      ) : (
        <Spinner />
      )}
    </ContainerSpaced>
  );
};
