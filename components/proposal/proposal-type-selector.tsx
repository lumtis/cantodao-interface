import React, { useState } from "react";

import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { ProposalType } from "../../types/proposal";
import Button from "../ui/button";
import ContainerSpaced from "../ui/container-spaced";

const ProposalTypeList = [
  {
    proposalType: ProposalType.TransferCanto,
    title: "Transfer Canto",
    description: "Transfer Canto from the DAO treasury to an address",
  },
  {
    proposalType: ProposalType.TransferTokens,
    title: "Transfer Tokens",
    description: "Transfer ERC20 tokens from the DAO treasury to an address",
  },
];

export const ProposalTypeSelector = ({
  setProposalType,
}: {
  setProposalType: (proposalType: ProposalType) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const ProposalTypeButton = ({ p }: any) => {
    return (
      <Box display="flex" flexDirection="row" alignItems="center">
        <Button
          onClick={() => {
            setProposalType(p.proposalType);
            setIsOpen(false);
          }}
          minW="200px"
          maxW="200px"
          minH="80px"
          maxH="80px"
          m="30px"
          fontSize="20px"
        >
          {p.title}
        </Button>
        <Text>{p.description}</Text>
      </Box>
    );
  };

  return (
    <ContainerSpaced>
      <Button
        p="30px"
        fontSize="20px"
        w="fit-content"
        onClick={() => setIsOpen(true)}
      >
        Select another proposal type
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent minW="600px">
          <ModalHeader>Select a proposal type</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {ProposalTypeList.map((p, i) => (
              <ProposalTypeButton key={i} p={p} />
            ))}
            <Text m={4}>More proposal types to come!</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ContainerSpaced>
  );
};
