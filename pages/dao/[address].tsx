import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  Box,
  Spinner,
  Text,
} from '@chakra-ui/react';

import { Balances } from '../../components/balances';
import { Dao } from '../../components/dao/dao';
import { VotingPower } from '../../components/dao/voting-power';
import { Proposals } from '../../components/proposal/proposals';
import BoxW from '../../components/ui/box';
import Button from '../../components/ui/button';
import ContainerPage from '../../components/ui/container-page';
import ContainerSpaced from '../../components/ui/container-spaced';
import Divider from '../../components/ui/divider';
import PageHeader from '../../components/ui/page-header';
import { GetNoteAddress } from '../../config/addresses';
import useQueryDAOInfo from '../../hooks/queries/useQueryDAOInfo';
import Layout from '../../layout/Layout';

// TODO: create a DAO balance component
const DaoPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { daoInfo, error, isLoading } = useQueryDAOInfo(address as string);

  return (
    <>
      <Layout>
        <Head>
          <title>DAO</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ContainerPage>
          <Box>
            {!isLoading && !error && daoInfo ? (
              <Box>
                <Box display="flex" flexDirection="row" alignItems="flex-start">
                  <Box w="100%">
                    <PageHeader
                      title="DAO"
                      imgSource="/static/images/computer.png"
                    />
                    <BoxW w="100%">
                      <Dao daoInfo={daoInfo} />
                    </BoxW>
                  </Box>
                  <Box ml={20} w="100%">
                    <PageHeader
                      title="Treasury"
                      imgSource="/static/images/cart.png"
                    />
                    <BoxW w="100%" mb="40px">
                      <ContainerSpaced>
                        <Balances
                          holderAddress={address as string}
                          contractAddresses={
                            daoInfo?.token
                              ? [GetNoteAddress(), daoInfo?.token]
                              : [GetNoteAddress()]
                          }
                          includeNative={true}
                        />
                        <Divider />
                        <Text>CSR tokens:</Text>
                        <Text>coming soon...</Text>
                      </ContainerSpaced>
                    </BoxW>
                    <PageHeader
                      title="Membership"
                      imgSource="/static/images/cosmonaut.png"
                    />
                    <BoxW w="100%">
                      <ContainerSpaced>
                        <VotingPower daoInfo={daoInfo} />
                      </ContainerSpaced>
                    </BoxW>
                  </Box>
                </Box>
                <Divider verticalPadding="50px" />
                <Box display="flex" flexDirection="row" alignItems="center">
                  <PageHeader
                    title="Proposals"
                    imgSource="/static/images/satellite.png"
                  />
                  <Link href={"/create/proposal/" + address}>
                    <Button fontSize="20px" m="auto">
                      Create a new proposal
                    </Button>
                  </Link>
                </Box>
                <Box mt={10}>
                  <Proposals
                    proposerContract={daoInfo.proposer}
                    governorContract={address as string}
                  />
                </Box>
              </Box>
            ) : (
              <Spinner />
            )}
          </Box>
        </ContainerPage>
      </Layout>
    </>
  );
};

export default DaoPage;
