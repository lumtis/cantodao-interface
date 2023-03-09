import { useState } from 'react';

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
} from '@chakra-ui/react';

import useTxWithdraw from '../../hooks/txs/useTxWithdraw';
import {
  DAOTokenDecimals,
  ParseToken,
} from '../../types/token';
import { TxInfo } from '../tx/tx-info';
import Button from '../ui/button';
import ContainerSpaced from '../ui/container-spaced';
import Input from '../ui/input';

export const WithdrawButton = ({
  address,
  contractAddress,
}: {
  address: string;
  contractAddress?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("0");

  const {
    data,
    isLoading: isLoadingTx,
    isSuccess: isSuccessTx,
    write,
  } = useTxWithdraw(
    address,
    ParseToken(amount, DAOTokenDecimals),
    contractAddress
  );
  const txHash = data?.hash;

  return (
    <ContainerSpaced>
      <Button w="fit-content" onClick={() => setIsOpen(true)}>
        Withdraw
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Withdraw dao tokens</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexDirection="row" alignItems="flex-end">
              <Text>Amount: </Text>
              <Input
                ml="auto"
                id="amount"
                name="amount"
                value={amount}
                types="number"
                step="any"
                onChange={(event: any) => setAmount(event.target.value)}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            {!isSuccessTx && !txHash && !isLoadingTx && (
              <Button disabled={!write} onClick={() => write?.()}>
                Withdraw
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
