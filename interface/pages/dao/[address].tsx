import Head from "next/head";
import { useRouter } from "next/router";

import { Box, Spinner } from "@chakra-ui/react";

import { Dao } from "../../components/Dao";
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
