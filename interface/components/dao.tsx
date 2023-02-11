import { Box, Heading, Image, Spinner } from "@chakra-ui/react";

import { DAOInfo } from "../hooks/queries/useQueryDAOInfo";
import useQueryTokenInfo from "../hooks/queries/useTokenInfo";
import ContainerSpaced from "./ui/container-spaced";
import { CopyCard } from "./ui/copy-card";

export const Dao = ({
  address,
  daoInfo,
  logoSize,
}: {
  address: string;
  daoInfo?: DAOInfo;
  logoSize?: string;
}) => {
  const { tokenInfo, error, isLoading } = useQueryTokenInfo(daoInfo?.token);

  let tokenComp = <Spinner />;
  if (!isLoading && !error && tokenInfo) {
    tokenComp = <Box></Box>;
  }

  return (
    <ContainerSpaced>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Heading>{daoInfo?.name}</Heading>
        <Box
          margin={10}
          border="4px"
          borderColor="secondary"
          borderRadius="50%"
        >
          <Image
            src={"https://i.imgur.com/Mfq75Wv.png"}
            alt="DAO logo"
            borderRadius="50%"
            h={logoSize || 40}
            w={logoSize || 40}
          />
        </Box>
      </Box>
      <CopyCard address={address} />
    </ContainerSpaced>
  );
};
