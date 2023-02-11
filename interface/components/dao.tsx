import { Box, Heading, Image, Spinner } from "@chakra-ui/react";

import useQueryDAOInfo from "../hooks/queries/useQueryDAOInfo";
import ContainerSpaced from "./ui/container-spaced";
import { CopyCard } from "./ui/copy-card";

export const DAO = ({
  address,
  logoSize,
}: {
  address: string;
  logoSize?: string;
}) => {
  const { daoInfo, error, isLoading } = useQueryDAOInfo(address);

  if (isLoading || error || !daoInfo) {
    return <Spinner />;
  }

  return (
    <ContainerSpaced>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Heading>{daoInfo?.name}</Heading>
        <Box
          margin={10}
          border="2px"
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
