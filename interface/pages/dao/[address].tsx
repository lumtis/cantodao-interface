import Head from "next/head";
import { useRouter } from "next/router";

import { Box, Spinner } from "@chakra-ui/react";

import { Balances } from "../../components/balances";
import { Dao } from "../../components/dao";
import BoxW from "../../components/ui/box";
import ContainerPage from "../../components/ui/container-page";
import PageHeader from "../../components/ui/page-header";
import useQueryDAOInfo from "../../hooks/queries/useQueryDAOInfo";
import Layout from "../../layout/Layout";

const DaoPage = () => {
  const router = useRouter();
  const { address } = router.query;

  const { daoInfo, error, isLoading } = useQueryDAOInfo(address as string);

  let content = <Spinner />;
  if (!isLoading && !error && daoInfo) {
    content = (
      <Box display="flex" flexDirection="row" alignItems="flex-start">
        <BoxW w="100%">
          <Dao address={address as string} daoInfo={daoInfo} />
        </BoxW>
        <Box ml={20} w="100%">
          <PageHeader title="Treasury" imgSource="/static/images/chest.png" />
          <BoxW w="100%">
            <Balances
              holderAddress={daoInfo?.executor}
              contractAddresses={daoInfo?.token ? [daoInfo?.token] : []}
              includeNative={true}
            />
          </BoxW>
        </Box>
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
          <PageHeader
            title="Dashboard"
            imgSource="/static/images/computer.png"
          />
          {content}
        </Box>
      </ContainerPage>
    </Layout>
  );
};

export default DaoPage;
