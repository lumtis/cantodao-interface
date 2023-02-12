import Head from "next/head";

import { Box } from "@chakra-ui/react";

import ContainerPage from "../components/ui/container-page";
import PageHeader from "../components/ui/page-header";
import Layout from "../layout/Layout";

const CreatePage = () => {
  return (
    <Layout>
      <ContainerPage>
        <Head>
          <title>Create DAO</title>
        </Head>
        <Box textAlign="center">
          <PageHeader
            title="Create new DAO"
            imgSource="/static/images/rocket.png"
          />
        </Box>
      </ContainerPage>
    </Layout>
  );
};

export default CreatePage;