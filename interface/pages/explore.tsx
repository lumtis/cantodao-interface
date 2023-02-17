import Head from "next/head";

import { Box } from "@chakra-ui/react";

import { Daos } from "../components/daos";
import ContainerPage from "../components/ui/container-page";
import PageHeader from "../components/ui/page-header";
import { GetDaoListAddresses } from "../config/addresses";
import Layout from "../layout/Layout";

const ExplorePage = () => {
  const daoList = GetDaoListAddresses();

  return (
    <Layout>
      <ContainerPage>
        <Head>
          <title>Explore</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box textAlign="center">
          <PageHeader
            title="Explore DAOs"
            imgSource="/static/images/ship.png"
          />
          <Daos addresses={daoList} />
        </Box>
      </ContainerPage>
    </Layout>
  );
};

export default ExplorePage;
