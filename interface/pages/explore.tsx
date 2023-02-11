import Head from "next/head";

import { Box } from "@chakra-ui/react";

import ContainerPage from "../components/ui/container-page";
import PageHeader from "../components/ui/page-header";
import Layout from "../layout/Layout";

const ExplorePage = () => {
  return (
    <Layout>
      <ContainerPage>
        <Head>
          <title>Explore</title>
        </Head>
        <Box textAlign="center">
          <PageHeader
            title="Explore DAOs"
            imgSource="/static/images/scroll.png"
          />
        </Box>
      </ContainerPage>
    </Layout>
  );
};

export default ExplorePage;
