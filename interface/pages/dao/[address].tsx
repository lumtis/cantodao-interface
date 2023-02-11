import Head from "next/head";
import { useRouter } from "next/router";

import { Box, Heading } from "@chakra-ui/react";

import { DAO } from "../../components/Dao";
import BoxW from "../../components/ui/box";
import ContainerPage from "../../components/ui/container-page";
import Layout from "../../layout/Layout";

const DaoPage = () => {
  const router = useRouter();
  const { address } = router.query;

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
            DAO
          </Heading>
          <BoxW width="fit-content">
            <DAO address={address as string} />
          </BoxW>
        </Box>
      </ContainerPage>
    </Layout>
  );
};

export default DaoPage;
