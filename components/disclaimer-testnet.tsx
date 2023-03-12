import { useState } from "react";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import Button from "./ui/button";

const TestnetDisclaimer = () => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal isOpen onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Disclaimer</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Cantodao is currently in alpha. Please use at your own risk.
              </Text>
              <Text>
                Cantodao is currently only available with Canto testnet. Please
                switch your Metamask network to Canto testnet to use the Dapp
              </Text>
              <Text>RPC: https://canto-testnet.plexnode.wtf/</Text>
              <Text>CHAIN ID: 7701</Text>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default TestnetDisclaimer;
