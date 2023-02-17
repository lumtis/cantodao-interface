import { Box, Heading, Image, Spinner } from "@chakra-ui/react";

import useQueryDAOInfo from "../hooks/queries/useQueryDAOInfo";
import BoxW from "./ui/box";
import ContainerSpaced from "./ui/container-spaced";
import { RouteCard } from "./ui/route-card";

export const DaoCard = ({
  address,
  logoSize,
}: {
  address: string;
  logoSize?: number;
}) => {
  const { daoInfo, error, isLoading } = useQueryDAOInfo(address);

  return (
    <BoxW m={4}>
      <ContainerSpaced>
        {!isLoading && !error && daoInfo ? (
          <ContainerSpaced>
            <Box margin={4} border="4px" borderColor="secondary">
              <Image
                src={daoInfo?.imageURL || "/static/images/planet.png"}
                alt="DAO logo"
                minH={logoSize || 20}
                minW={logoSize || 20}
              />
            </Box>
            <Heading>{daoInfo?.name}</Heading>
            <RouteCard cardText="Visit" route={"/dao/" + address} />
          </ContainerSpaced>
        ) : (
          <Spinner />
        )}
      </ContainerSpaced>
    </BoxW>
  );
};
