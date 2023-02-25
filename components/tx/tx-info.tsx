import { Box } from "@chakra-ui/react";

import { TxConfirmed } from "./tx-confirmed";
import { TxConfirming } from "./tx-confirming";

export const TxInfo = ({
  txHash,
  isLoadingTx,
  isSuccessTx,
}: {
  txHash?: string;
  isLoadingTx: boolean;
  isSuccessTx: boolean;
}) => {
  return (
    <Box>
      {isLoadingTx && <TxConfirming />}
      {isSuccessTx && txHash && <TxConfirmed tx={txHash} />}
    </Box>
  );
};
