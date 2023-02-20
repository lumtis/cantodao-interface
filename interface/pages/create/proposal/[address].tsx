import Head from "next/head";
import { useRouter } from "next/router";

import { Box, Spinner } from "@chakra-ui/react";

import { CreateProposal } from "../../../components/proposal/proposal-create";
import BoxW from "../../../components/ui/box";
import ContainerPage from "../../../components/ui/container-page";
import PageHeader from "../../../components/ui/page-header";
import useQueryDAOInfo from "../../../hooks/queries/useQueryDAOInfo";
import Layout from "../../../layout/Layout";

const CreateProposalPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { daoInfo, error, isLoading } = useQueryDAOInfo(address as string);

  return (
    <Layout>
      <ContainerPage>
        <Head>
          <title>Create a proposal</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box textAlign="center">
          <PageHeader
            title="Create a new proposal"
            imgSource="/static/images/satellite.png"
          />
          {!isLoading && !error && daoInfo && daoInfo.proposer ? (
            <BoxW width="fit-content" m="auto">
              <CreateProposal proposerAddress={daoInfo.proposer} />
            </BoxW>
          ) : (
            <Spinner />
          )}
        </Box>
      </ContainerPage>
    </Layout>
  );
};

export default CreateProposalPage;
