import { useState } from "react";

import { BigNumber, ethers } from "ethers";
import { usePrepareSendTransaction, useSendTransaction } from "wagmi";

import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { NativeToken } from "../../config/chain";
import { TxInfo } from "../tx/tx-info";
import Button from "../ui/button";
import ContainerSpaced from "../ui/container-spaced";
import Input from "../ui/input";

export const Fund = ({
  header,
  buttonText,
  address,
}: {
  header: string;
  buttonText: string;
  address?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [amount, setAmount] = useState("0");
  const { config } = usePrepareSendTransaction({
    request: {
      to: address || "",
      value: parseFloat(amount)
        ? ethers.utils.parseEther(amount)
        : BigNumber.from("0"),
    },
  });
  const {
    data,
    isLoading: isLoadingTx,
    isSuccess: isSuccessTx,
    sendTransaction,
  } = useSendTransaction(config);
  const txHash = data?.hash;

  return (
    <ContainerSpaced>
      <Button w="fit-content" onClick={() => setIsOpen(true)}>
        {buttonText}
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
          </ModalBody>
          <ModalFooter>
            {!isSuccessTx && !txHash && !isLoadingTx && (
              <Button
                disabled={!sendTransaction}
                onClick={() => sendTransaction?.()}
              >
                Send
              </Button>
            )}
            <TxInfo
              isLoadingTx={isLoadingTx}
              isSuccessTx={isSuccessTx}
              txHash={txHash}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ContainerSpaced>
  );
};
