import { Link, Text } from "@chakra-ui/react";

import { GetExplorer } from "../../config/chain";
import ContainerSpaced from "../ui/container-spaced";
import { CopyCard } from "../ui/copy-card";

export const TxConfirmed = ({ tx }: { tx: string }) => {
  const explorer = GetExplorer();
  const txLink = explorer && explorer + tx;

  return (
    <ContainerSpaced>
      <Text>Tx sent:</Text>
      {txLink ? (
        <Link href={txLink}>
          <CopyCard address={tx} isLoading={false} />
        </Link>
      ) : (
        <CopyCard address={tx} isLoading={false} />
      )}
    </ContainerSpaced>
  );
};
