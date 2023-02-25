import { useState } from "react";

import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import Button from "./ui/button";

const InfoBox = ({ children, heading }: { children: any; heading: string }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button
        borderWidth="0px"
        borderRadius="50%"
        w={10}
        onClick={() => setShowModal(true)}
      >
        <Image src="/static/images/info.png" minH={10} minW={10} />
      </Button>
      {showModal && (
        <Modal isOpen onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{heading}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button onClick={handleClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default InfoBox;
