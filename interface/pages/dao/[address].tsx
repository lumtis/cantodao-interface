import Head from "next/head";
import { useRouter } from "next/router";

import { Box, Heading, Spinner } from "@chakra-ui/react";

import { Dao } from "../../components/Dao";
import BoxW from "../../components/ui/box";
import ContainerPage from "../../components/ui/container-page";
import useQueryDAOInfo from "../../hooks/queries/useQueryDAOInfo";
import Layout from "../../layout/Layout";

const DaoPage = () => {
  const router = useRouter();
  const { address } = router.query;

  const { daoInfo, error, isLoading } = useQueryDAOInfo(address as string);

  let content = <Spinner />;
  if (!isLoading && !error && daoInfo) {
    content = (
      <Box>
        <BoxW width="fit-content">
          <Dao address={address as string} daoInfo={daoInfo} />
        </BoxW>
      </Box>
    );
  }

  return (
    <Layout>
      <Head>
        <title>DAO</title>
      </Head>
      <ContainerPage>
        <Box>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            fontWeight="extrabold"
            mb={3}
          >
            Dashboard
          </Heading>
          {content}
        </Box>
      </ContainerPage>
    </Layout>
  );
};

export default DaoPage;
