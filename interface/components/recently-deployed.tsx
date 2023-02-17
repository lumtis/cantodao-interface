import { Box, Spinner } from "@chakra-ui/react";

import useAccountWrapped from "../hooks/useAccount";
import useRetrieveDeployerDAOs from "../hooks/useRetrieveDeployerDAOs";
import { Daos } from "./daos";

export const RecentlyDeployed = ({ blockCount }: { blockCount: number }) => {
  const { address, isConnected } = useAccountWrapped();
  let daos = useRetrieveDeployerDAOs(blockCount, address);

  return (
    <Box>
      {isConnected && address && daos ? <Daos addresses={daos} /> : <Spinner />}
    </Box>
  );
};
