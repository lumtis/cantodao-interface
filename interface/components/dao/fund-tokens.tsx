import { useState } from "react";

import { BigNumber } from "ethers";

import { Box, Heading, Text } from "@chakra-ui/react";

import { GetNoteAddress } from "../../config/addresses";
import { NativeToken } from "../../config/chain";
import useTxTransferTokens from "../../hooks/txs/useTxTransferTokens";
import { NullAddress } from "../../types/evm";
import { TokenSelector } from "../token-selector";
import { TxInfo } from "../tx/tx-info";
import Button from "../ui/button";
import ContainerSpaced from "../ui/container-spaced";
import Input from "../ui/input";

export const FundTokens = ({ daoRecipient }: { daoRecipient?: string }) => {
  const [amount, setAmount] = useState("0");
  const [token, setToken] = useState<string>(GetNoteAddress());

  const {
    data,
    isLoading: isLoadingTx,
    isSuccess: isSuccessTx,
    write,
  } = useTxTransferTokens(
    daoRecipient || NullAddress,
    token,
    BigNumber.from(amount)
  );
  const txHash = data?.hash;

  return (
    <ContainerSpaced>
      <Heading m={4}>Tokens funding</Heading>
      <Text>ERC20 token address:</Text>
      <TokenSelector tokens={[]} setToken={setToken} />

      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Text>Amount ({NativeToken}): </Text>
        <Input
          type="number"
          id="amount"
          name="amount"
          step="any"
          value={amount}
          onChange={(event: any) => setAmount(event.target.value || "0")}
        />
      </Box>
      {!isSuccessTx && !txHash && !isLoadingTx && (
        <Button disabled={!write} onClick={() => write?.()}>
          Send
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
