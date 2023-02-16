import { useState } from "react";

import { ethers } from "ethers";

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
import useTxProposeTransferCoins from "../hooks/txs/useTxProposeCoins";
import { NullAddress } from "../utils/evm";
import { TxInfo } from "./tx/tx-info";
import Button from "./ui/button";
import ContainerSpaced from "./ui/container-spaced";
import Input from "./ui/input";

export const CreateProposal = ({
  header,
  buttonText,
  contractAddress,
}: {
  header: string;
  buttonText: string;
  contractAddress: string;
}) => {
  // Modal open/close state
  const [isOpen, setIsOpen] = useState(false);

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
    contractAddress,
    recipient,
    ethers.utils.parseEther(amount),
    description
  );
  const txHash = data?.hash;

  return (
    <ContainerSpaced>
      <Button
        fontSize="20px"
        minW="fit-content"
        onClick={() => setIsOpen(true)}
      >
        {buttonText}
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent maxW="600px">
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ContainerSpaced>
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
                <Text>Amount ({NativeToken}): </Text>
                <Input
                  ml="auto"
                  type="number"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(event: any) =>
                    setAmount(event.target.value || "0")
                  }
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
            </ContainerSpaced>
          </ModalBody>
          <ModalFooter>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ContainerSpaced>
  );
};
