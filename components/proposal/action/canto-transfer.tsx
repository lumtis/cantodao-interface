import { BigNumber, utils } from "ethers";

import { Text } from "@chakra-ui/react";

import { CopyCard } from "../../ui/copy-card";

export const CantoTransferAction = ({
  recipient,
  amount,
}: {
  recipient: string;
  amount: BigNumber;
}) => {
  return (
    <Text>
      Transfer ⋐{utils.formatEther(amount)} to <CopyCard address={recipient} />
    </Text>
  );
};
