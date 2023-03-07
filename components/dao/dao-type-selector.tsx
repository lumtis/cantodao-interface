import React, { useState } from 'react';

import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import { DAOType } from '../../types/dao';
import Button from '../ui/button';
import ContainerSpaced from '../ui/container-spaced';

const DAOTypeList = [
  {
    daoType: DAOType.NewTokenDAO,
    title: "New governance token",
    description:
      "The DAO governance is based on a new token minted into the deployer address",
  },
  {
    daoType: DAOType.ExistingTokenDAO,
    title: "Existing token based",
    description: "The DAO governance is based on an existing token",
  },
];

export const DAOTypeSelector = ({
  setDAOType,
}: {
  setDAOType: (daoType: DAOType) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const DAOTypeButton = ({ dao }: any) => {
    return (
      <Box display="flex" flexDirection="row" alignItems="center">
        <Button
          onClick={() => {
            setDAOType(dao.daoType);
            setIsOpen(false);
          }}
          minW="200px"
          maxW="200px"
          minH="80px"
          maxH="80px"
          m="30px"
          fontSize="20px"
        >
          {dao.title}
        </Button>
        <Text>{dao.description}</Text>
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
        Select another DAO type
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent minW="600px">
          <ModalHeader>Select a DAO type</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {DAOTypeList.map((dao, i) => (
              <DAOTypeButton key={i} dao={dao} />
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </ContainerSpaced>
  );
};
