import { useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { Box, Spinner } from "@chakra-ui/react";

import { CreateProposalTransferCanto } from "../../../components/proposal/create/transfer-canto";
import { CreateProposalTransferTokens } from "../../../components/proposal/create/transfer-tokens";
import { ProposalTypeSelector } from "../../../components/proposal/proposal-type-selector";
import BoxW from "../../../components/ui/box";
import ContainerPage from "../../../components/ui/container-page";
import PageHeader from "../../../components/ui/page-header";
import useQueryDAOInfo from "../../../hooks/queries/useQueryDAOInfo";
import Layout from "../../../layout/Layout";
import { ProposalType } from "../../../types/proposal";

const CreateProposalPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { daoInfo, error, isLoading } = useQueryDAOInfo(address as string);
  const [proposalType, setProposalType] = useState<ProposalType>(
    ProposalType.TransferCanto
  );

  console.log(proposalType);

  return (
    <Layout>
      <ContainerPage>
        <Head>
          <title>Create a proposal</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <PageHeader
          title="Create a new proposal"
          imgSource="/static/images/satellite.png"
        />
        <Box display="flex" flexDirection="row" alignItems="flex-start">
          {!isLoading && !error && daoInfo && daoInfo.proposer ? (
            <BoxW width="fit-content" m="auto">
              {proposalType === ProposalType.TransferCanto && (
                <CreateProposalTransferCanto
                  proposerAddress={daoInfo.proposer}
                />
              )}
              {proposalType === ProposalType.TransferTokens && (
                <CreateProposalTransferTokens
                  proposerAddress={daoInfo.proposer}
                />
              )}
            </BoxW>
          ) : (
            <Spinner />
          )}
          <ProposalTypeSelector setProposalType={setProposalType} />
        </Box>
      </ContainerPage>
    </Layout>
  );
};

export default CreateProposalPage;
