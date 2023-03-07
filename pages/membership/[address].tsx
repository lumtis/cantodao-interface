import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  Box,
  Spinner,
  Text,
} from '@chakra-ui/react';

import { VotingModule } from '../../components/membership/voting-module';
import { VotingPower } from '../../components/membership/voting-power';
import BoxW from '../../components/ui/box';
import ContainerPage from '../../components/ui/container-page';
import PageHeader from '../../components/ui/page-header';
import { RouteCard } from '../../components/ui/route-card';
import useQueryDAOInfo from '../../hooks/queries/useQueryDAOInfo';
import Layout from '../../layout/Layout';

const MembershipPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { daoInfo, error, isLoading } = useQueryDAOInfo(address as string);

  return (
    <Layout>
      <Head>
        <title>Membership</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContainerPage>
        <Box w="fit-content">
          <RouteCard
            arrowLeft={true}
            cardText="Back to DAO"
            route={"/dao/" + address}
          />
        </Box>
        <Box>
          {!isLoading && !error && daoInfo ? (
            <Box>
              <Box display="flex" flexDirection="row" alignItems="flex-start">
                <Box w="100%">
                  <PageHeader
                    title="Voting Module"
                    imgSource="/static/images/cosmonaut.png"
                  />
                  <BoxW w="100%">
                    <VotingModule daoInfo={daoInfo} />
                  </BoxW>
                </Box>
                <Box ml={20} w="100%">
                  <PageHeader
                    title="Your Voting Power"
                    imgSource="/static/images/cosmonaut.png"
                  />
                  <BoxW w="100%" mb="40px">
                    <VotingPower daoInfo={daoInfo} />
                  </BoxW>
                </Box>
              </Box>
              <Box mt={8}>
                <PageHeader
                  title="Members"
                  imgSource="/static/images/cosmonaut.png"
                />
                <Text>Not supported yet</Text>
              </Box>
            </Box>
          ) : (
            <Spinner />
          )}
        </Box>
      </ContainerPage>
    </Layout>
  );
};

export default MembershipPage;
