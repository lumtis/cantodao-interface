import { BigNumber } from "ethers";
import Head from "next/head";
import { useRouter } from "next/router";
import { useBlockNumber } from "wagmi";

import { Box, Heading, Image, Spinner, Text } from "@chakra-ui/react";

import { ExecutionDashboard } from "../../../components/proposal/execution-dashboard";
import { ProposalInfo } from "../../../components/proposal/proposal-info";
import { VoteDashboard } from "../../../components/proposal/vote-dashboard";
import { VoteResults } from "../../../components/proposal/vote-results";
import { VoteTurnout } from "../../../components/proposal/vote-turnout";
import BoxW from "../../../components/ui/box";
import ContainerPage from "../../../components/ui/container-page";
import PageHeader from "../../../components/ui/page-header";
import { RouteCard } from "../../../components/ui/route-card";
import useQueryDAOInfo from "../../../hooks/queries/useQueryDAOInfo";
import useQueryProposal from "../../../hooks/queries/useQueryProposal";
import useQueryProposalContent from "../../../hooks/queries/useQueryProposalContent";
import useQueryProposalID from "../../../hooks/queries/useQueryProposalID";
import useQueryProposalState from "../../../hooks/queries/useQueryProposalState";
import Layout from "../../../layout/Layout";
import {
  ProposalState,
  VoteState,
  VoteStateFromBlockNumber,
} from "../../../utils/proposal";

const ProposalPage = () => {
  const router = useRouter();
  const { address, index } = router.query;

  const indexNumber = !isNaN(Number(index))
    ? BigNumber.from(index)
    : BigNumber.from(0);

  const {
    data: blockNumber,
    isError: isErrorBlockNumber,
    isLoading: isLoadingBlockNumber,
  } = useBlockNumber();

  // DAO info
  const {
    daoInfo,
    error: errorInfo,
    isLoading: isLoadingInfo,
  } = useQueryDAOInfo(address as string);

  // Proposal info
  const {
    proposalID,
    error: errorID,
    isLoading: isLoadingID,
  } = useQueryProposalID(daoInfo?.proposer as string, indexNumber);
  const {
    proposalContent,
    error: errorContent,
    isLoading: isLoadingContent,
  } = useQueryProposalContent(daoInfo?.proposer as string, proposalID);
  let {
    proposalState,
    error: errorState,
    isLoading: isLoadingState,
  } = useQueryProposalState(address as string, proposalID);
  const {
    proposal,
    error: errorProposal,
    isLoading: isLoadingProposal,
  } = useQueryProposal(address as string, proposalID);

  if (!proposalState) {
    proposalState = ProposalState.Pending;
  }

  // Wait for all necessary data to render the page
  const proposalDataReady =
    !isLoadingBlockNumber &&
    !isErrorBlockNumber &&
    blockNumber &&
    !isLoadingInfo &&
    !errorInfo &&
    daoInfo &&
    !isLoadingID &&
    !errorID &&
    proposalID &&
    !isLoadingContent &&
    !errorContent &&
    proposalContent &&
    !isLoadingState &&
    !errorState &&
    proposalState != undefined &&
    !isLoadingProposal &&
    !errorProposal &&
    proposal;

  const voteState: VoteState = proposalDataReady
    ? VoteStateFromBlockNumber(proposal, blockNumber)
    : VoteState.NotStarted;

  return (
    <Layout>
      {proposalDataReady ? (
        <ContainerPage>
          <Head>
            <title>Proposal</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Box w="fit-content">
            <RouteCard
              arrowLeft={true}
              cardText="Back to DAO"
              route={"/dao/" + address}
            />
          </Box>
          <Box display="flex" flexDirection="row" alignItems="flex-start">
            <Box>
              <PageHeader
                title={"Proposal #" + indexNumber.toString()}
                imgSource="/static/images/satellite.png"
              />
              <BoxW>
                <ProposalInfo
                  proposal={proposal}
                  proposalID={proposalID}
                  proposalState={proposalState}
                  proposalContent={proposalContent}
                  blockNumber={blockNumber}
                />
              </BoxW>
            </Box>
            {voteState === VoteState.NotStarted && (
              <Image m="auto" src="/static/images/space.png" maxWidth="500px" />
            )}
            {voteState === VoteState.InProgress && (
              <Box ml={20}>
                <PageHeader
                  title={"Your vote"}
                  imgSource="/static/images/letter.png"
                />
                <BoxW mt={8}>
                  <VoteDashboard
                    daoAddress={address as string}
                    daoInfo={daoInfo}
                    proposalID={proposalID}
                    proposal={proposal}
                  />
                </BoxW>
              </Box>
            )}
            {voteState === VoteState.Ended && (
              <Box ml={20}>
                <BoxW mt={20}>
                  <ExecutionDashboard
                    daoAddress={address as string}
                    proposalState={proposalState}
                    proposalContent={proposalContent}
                  />
                </BoxW>
              </Box>
            )}
          </Box>
          <Box>
            <Heading>Results</Heading>
            <BoxW mt={8}>
              {voteState !== VoteState.NotStarted ? (
                <Box display="flex" flexDirection="row" alignItems="flex-start">
                  <Box w="40%">
                    <VoteResults proposal={proposal} />
                  </Box>
                  <Box w="60%">
                    <VoteTurnout
                      proposal={proposal}
                      daoInfo={daoInfo}
                      finished={voteState === VoteState.Ended}
                    />
                  </Box>
                </Box>
              ) : (
                <Text>Vote not started</Text>
              )}
            </BoxW>
          </Box>
        </ContainerPage>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

export default ProposalPage;
