import Link from 'next/link';

import {
  Box,
  Heading,
  Image,
  Spinner,
} from '@chakra-ui/react';

import useQueryDAOInfo from '../../hooks/queries/useQueryDAOInfo';
import BoxW from '../ui/box';
import ContainerSpaced from '../ui/container-spaced';

export const DaoCard = ({
  address,
  logoSize,
}: {
  address: string;
  logoSize?: number;
}) => {
  const { daoInfo, error, isLoading } = useQueryDAOInfo(address);

  return (
    <Link href={"/dao/" + address}>
      <BoxW
        m={4}
        _hover={{
          cursor: "pointer",
          bg: "primarydarkest",
        }}
      >
        <ContainerSpaced>
          {!isLoading && !error && daoInfo ? (
            <ContainerSpaced>
              <Box margin={4} border="4px" borderColor="secondary">
                <Image
                  src={daoInfo?.imageURL || "/static/images/logo2.png"}
                  alt="DAO logo"
                  minH={logoSize || 20}
                  minW={logoSize || 20}
                />
              </Box>
              <Heading>{daoInfo?.name}</Heading>
            </ContainerSpaced>
          ) : (
            <Spinner />
          )}
        </ContainerSpaced>
      </BoxW>
    </Link>
  );
};
