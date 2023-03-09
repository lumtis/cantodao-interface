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

import useTxDeposit from '../../hooks/txs/useTxDeposit';
import { ParseToken } from '../../types/token';
import { TxInfo } from '../tx/tx-info';
import Button from '../ui/button';
import ContainerSpaced from '../ui/container-spaced';
import Input from '../ui/input';

export const DepositButton = ({
  address,
  contractAddress,
  tokenDecimals,
}: {
  address: string;
  contractAddress?: string;
  tokenDecimals?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("0");

  const {
    data,
    isLoading: isLoadingTx,
    isSuccess: isSuccessTx,
    write,
  } = useTxDeposit(
    address,
    ParseToken(amount, tokenDecimals || 0),
    contractAddress
  );
  const txHash = data?.hash;

  return (
    <ContainerSpaced>
      <Button w="fit-content" onClick={() => setIsOpen(true)}>
        Deposit
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deposit tokens</ModalHeader>
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
                Deposit
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
