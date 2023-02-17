import Head from "next/head";

import { Box } from "@chakra-ui/react";

import { Daos } from "../components/daos";
import ContainerPage from "../components/ui/container-page";
import PageHeader from "../components/ui/page-header";
import useAccountWrapped from "../hooks/useAccount";
import useRetrieveDeployerDAOs from "../hooks/useRetrieveDeployerDAOs";
import Layout from "../layout/Layout";

const DeployedPage = () => {
  const { address, isConnected } = useAccountWrapped();

  const daos = useRetrieveDeployerDAOs(address);
  return (
    <Layout>
      <ContainerPage>
        <Head>Deployed DAOs</Head>
        <Box textAlign="center">
          <PageHeader
            title="DAOs you deployed"
            imgSource="/static/images/satellite.png"
          />
          <Daos addresses={daos} />
        </Box>
      </ContainerPage>
    </Layout>
  );
};

export default DeployedPage;
