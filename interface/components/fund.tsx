import { useState } from "react";

import { ethers } from "ethers";
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

import { NativeToken } from "../config/chain";
import Button from "./ui/button";
import ContainerSpaced from "./ui/container-spaced";
import Input from "./ui/input";

export const Fund = ({
  header,
  buttonText,
  address,
}: {
  header: string;
  buttonText: string;
  address?: string;
}) => {
  const [amount, setAmount] = useState("0");
  const { config } = usePrepareSendTransaction({
    request: {
      to: address || "",
      value: ethers.utils.parseEther(amount),
    },
  });
  const {
    data,
    isLoading: isLoadingTx,
    isSuccess,
    sendTransaction,
  } = useSendTransaction(config);

  const [isOpen, setIsOpen] = useState(false);

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
                value={amount}
                onChange={(event: any) => setAmount(event.target.value || "0")}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={!sendTransaction}
              onClick={() => sendTransaction?.()}
            >
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ContainerSpaced>
  );
};
