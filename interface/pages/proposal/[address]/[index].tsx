import { BigNumber } from "ethers";
import { useRouter } from "next/router";

import { Box, Heading, Spinner, Text } from "@chakra-ui/react";

import { ProposalStateBox } from "../../../components/proposal-state-box";
import BoxW from "../../../components/ui/box";
import ContainerPage from "../../../components/ui/container-page";
import ContainerSpaced from "../../../components/ui/container-spaced";
import { CopyCard } from "../../../components/ui/copy-card";
import PageHeader from "../../../components/ui/page-header";
import useQueryDAOInfo from "../../../hooks/queries/useQueryDAOInfo";
import useQueryProposal from "../../../hooks/queries/useQueryProposal";
import useQueryProposalContent from "../../../hooks/queries/useQueryProposalContent";
import useQueryProposalID from "../../../hooks/queries/useQueryProposalID";
import useQueryProposalState from "../../../hooks/queries/useQueryProposalState";
import Layout from "../../../layout/Layout";
import { ProposalState } from "../../../utils/proposal";

const ProposalPage = () => {
  const router = useRouter();
  const { address, index } = router.query;

  const indexNumber = !isNaN(Number(index))
    ? BigNumber.from(index)
    : BigNumber.from(0);

  Number();
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
  } = useQueryProposalID(address as string, indexNumber);
  const {
    proposalContent,
    error: errorContent,
    isLoading: isLoadingContent,
  } = useQueryProposalContent(address as string, proposalID);
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

  return (
    <Layout>
      {!isLoadingInfo && !errorInfo && daoInfo ? (
        <ContainerPage>
          <PageHeader
            title={"Proposal #" + indexNumber.toString()}
            imgSource="/static/images/scroll.png"
          />
          <BoxW maxW="50%">
            <ContainerSpaced>
              <Box display="flex" flexDirection="row" alignItems="flex-end">
                <Text>Proposal ID:</Text>
                <CopyCard address={proposalID?.toString()} />
              </Box>
              <Box display="flex" flexDirection="row" alignItems="flex-end">
                <Text>State: </Text>
                <ProposalStateBox proposalState={proposalState} />
              </Box>
              <Text>Description: {proposalContent?.description}</Text>

              <Heading>Action:</Heading>
              <Box display="flex" flexDirection="row" alignItems="flex-end">
                <Text>Target address:</Text>
                <CopyCard address={proposalContent?.targetAddress?.[0]} />
              </Box>
              <Text>Amount: {proposalContent?.amount?.[0]?.toString()}</Text>
              <Text>
                Calldata: {proposalContent?.calldata?.[0]?.toString()}
              </Text>

              <Heading>Voting:</Heading>
              <Text>For: {proposal?.forVotes?.toString()}</Text>
              <Text>Against: {proposal?.againstVotes?.toString()}</Text>
              <Text>Abstain: {proposal?.abstainVotes?.toString()}</Text>
            </ContainerSpaced>
          </BoxW>
        </ContainerPage>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

export default ProposalPage;
