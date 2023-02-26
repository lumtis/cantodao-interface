import { useState } from "react";

import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const InfoBox = ({ children, heading }: { children: any; heading: string }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button
        bg="dark"
        _hover={{ bg: "dark" }}
        _active={{ bg: "dark" }}
        borderWidth="0px"
        borderRadius="50%"
        w={10}
        onClick={() => setShowModal(true)}
      >
        <Image src="/static/images/info.png" minH={8} minW={8} />
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
