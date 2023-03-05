import { useState } from 'react';

import { utils } from 'ethers';
import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  Box,
  Spinner,
  Text,
} from '@chakra-ui/react';

import {
  CreateProposalTransferCanto,
} from '../../../components/proposal/create/transfer-canto';
import {
  CreateProposalTransferTokens,
} from '../../../components/proposal/create/transfer-tokens';
import {
  ProposalTypeSelector,
} from '../../../components/proposal/proposal-type-selector';
import BoxW from '../../../components/ui/box';
import ContainerPage from '../../../components/ui/container-page';
import PageHeader from '../../../components/ui/page-header';
import { RouteCard } from '../../../components/ui/route-card';
import useQueryAvailableVotes
  from '../../../hooks/queries/useQueryAvailableVotes';
import useQueryDAOInfo from '../../../hooks/queries/useQueryDAOInfo';
import useQueryProposalMinimalVotingPower
  from '../../../hooks/queries/useQueryProposalMinimalVotingPower';
import useAccountWrapped from '../../../hooks/useAccount';
import Layout from '../../../layout/Layout';
import { NullAddress } from '../../../types/evm';
import { ProposalType } from '../../../types/proposal';
import { DAOTokenDecimals } from '../../../types/token';

const CreateProposalPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { daoInfo, error, isLoading } = useQueryDAOInfo(address as string);
  const [proposalType, setProposalType] = useState<ProposalType>(
    ProposalType.TransferCanto
  );

  const { address: accountAddress, isConnected } = useAccountWrapped();

  const {
    votes,
    error: errorVotes,
    isLoading: isLoadingVotes,
  } = useQueryAvailableVotes(
    accountAddress || NullAddress,
    daoInfo?.votingModule
  );

  const {
    minimalVotingPower,
    error: errorMinimalVotingPower,
    isLoading: isLoadingMinimalVotingPower,
  } = useQueryProposalMinimalVotingPower(daoInfo?.proposer);

  const ready =
    isConnected &&
    !errorVotes &&
    !isLoadingVotes &&
    votes &&
    !errorMinimalVotingPower &&
    !isLoadingMinimalVotingPower &&
    minimalVotingPower;

  return (
    <Layout>
      <ContainerPage>
        <Head>
          <title>Create a proposal</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box w="fit-content">
          <RouteCard
            arrowLeft={true}
            cardText="Back to DAO"
            route={"/dao/" + address}
          />
        </Box>
        <PageHeader
          title="Create a new proposal"
          imgSource="/static/images/satellite.png"
        />
        {!ready && <Spinner />}
        {ready && votes.lt(minimalVotingPower) ? (
          <Box>
            <Text>
              You need at least{" "}
              {utils.formatUnits(minimalVotingPower, DAOTokenDecimals)} voting
              power to create a proposal for this DAO.
            </Text>
            <Text>
              You currently have {utils.formatUnits(votes, DAOTokenDecimals)}{" "}
              voting power.
            </Text>
          </Box>
        ) : (
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
                    daoAddress={address as string}
                  />
                )}
              </BoxW>
            ) : (
              <Spinner />
            )}
            <ProposalTypeSelector setProposalType={setProposalType} />
          </Box>
        )}
      </ContainerPage>
    </Layout>
  );
};

export default CreateProposalPage;
