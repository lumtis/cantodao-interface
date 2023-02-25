import Head from "next/head";

import { Box } from "@chakra-ui/react";

import { CreateDAO } from "../../components/dao/dao-create";
import { RecentlyDeployed } from "../../components/dao/recently-deployed";
import BoxW from "../../components/ui/box";
import ContainerPage from "../../components/ui/container-page";
import PageHeader from "../../components/ui/page-header";
import Layout from "../../layout/Layout";

// Around 4 hours
const BLOCK_COUNT = 3000;

const CreateDAOPage = () => {
  return (
    <Layout>
      <ContainerPage>
        <Head>
          <title>Create a DAO</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box textAlign="center">
          <PageHeader
            title="Create a new DAO"
            imgSource="/static/images/rocket.png"
          />
          <BoxW width="fit-content" m="auto">
            <CreateDAO />
          </BoxW>
        </Box>
        <Box>
          <PageHeader
            title="Recently deployed (last 4 hours)"
            imgSource="/static/images/satellite.png"
          />
          <Box m="auto">
            <RecentlyDeployed blockCount={BLOCK_COUNT} />
          </Box>
        </Box>
      </ContainerPage>
    </Layout>
  );
};

export default CreateDAOPage;
