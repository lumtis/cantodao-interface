import { useState } from "react";

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

import useTxDelegate from "../hooks/txs/useTxDelegate";
import { NullAddress } from "../utils/evm";
import { TxInfo } from "./tx/tx-info";
import Button from "./ui/button";
import ContainerSpaced from "./ui/container-spaced";
import Input from "./ui/input";

export const Delegate = ({
  header,
  buttonText,
  address,
  defaultRecipient,
}: {
  header: string;
  buttonText: string;
  address?: string;
  defaultRecipient?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [recipient, setRecipient] = useState(defaultRecipient || NullAddress);

  const {
    data,
    isLoading: isLoadingTx,
    isSuccess: isSuccessTx,
    write,
  } = useTxDelegate(address, defaultRecipient);
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
              <Text>Recipient: </Text>
              <Input
                ml="auto"
                id="recipient"
                name="recipient"
                value={recipient}
                onChange={(event: any) => setRecipient(event.target.value)}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            {!isSuccessTx && !txHash && !isLoadingTx && (
              <Button disabled={!write} onClick={() => write?.()}>
                Delegate
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
