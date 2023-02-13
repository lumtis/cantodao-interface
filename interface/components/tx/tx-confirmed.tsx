import { Text } from "@chakra-ui/react";

import ContainerSpaced from "../ui/container-spaced";
import { CopyCard } from "../ui/copy-card";

export const TxConfirmed = ({ tx }: { tx: string }) => {
  return (
    <ContainerSpaced>
      <Text>Tx sent:</Text>
      <CopyCard address={tx} isLoading={false} />
    </ContainerSpaced>
  );
};
