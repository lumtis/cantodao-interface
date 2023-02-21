import { useState } from "react";

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

import Button from "../ui/button";
import ContainerSpaced from "../ui/container-spaced";
import { FundCoins } from "./fund-coins";
import { FundTokens } from "./fund-tokens";

enum SelectedFunding {
  Coins,
  Tokens,
}

// Unused
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
  const [selectedFunding, setSelectedFunding] = useState(SelectedFunding.Coins);

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
              <Button
                m={4}
                onClick={() => setSelectedFunding(SelectedFunding.Coins)}
              >
                <Text>Fund Canto</Text>
              </Button>
              <Button
                m={4}
                onClick={() => setSelectedFunding(SelectedFunding.Tokens)}
              >
                <Text>Fund Tokens</Text>
              </Button>
            </Box>
            {selectedFunding === SelectedFunding.Coins && (
              <FundCoins daoRecipient={address} />
            )}
            {selectedFunding === SelectedFunding.Tokens && (
              <FundTokens daoRecipient={address} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </ContainerSpaced>
  );
};
