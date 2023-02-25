import Head from "next/head";

import { Box } from "@chakra-ui/react";

import { Daos } from "../components/dao/daos";
import { FactoryDAOs } from "../components/dao/factory-daos";
import { ExploreInfo } from "../components/info/explore";
import InfoBox from "../components/infobox";
import ContainerPage from "../components/ui/container-page";
import PageHeader from "../components/ui/page-header";
import { GetDaoFactoryAddress, GetDaoListAddresses } from "../config/addresses";
import Layout from "../layout/Layout";

const ExplorePage = () => {
  const daoList = GetDaoListAddresses();

  const permissionlessListing = process.env.NEXT_PUBLIC_PERMISSIONLESS;

  return (
    <Layout>
      <ContainerPage>
        <Head>
          <title>Explore</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box textAlign="center">
          <Box display="flex" flexDirection="row" alignItems="flex-start">
            <PageHeader
              title="Explore DAOs"
              imgSource="/static/images/ship.png"
              mr={4}
            />
            <InfoBox heading="Explore DAOs">
              <ExploreInfo />
            </InfoBox>
          </Box>
          {permissionlessListing ? (
            <FactoryDAOs factoryAddress={GetDaoFactoryAddress()} />
          ) : (
            <Daos addresses={daoList} />
          )}
        </Box>
      </ContainerPage>
    </Layout>
  );
};

export default ExplorePage;
