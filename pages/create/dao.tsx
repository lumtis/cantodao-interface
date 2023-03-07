import { useState } from 'react';

import Head from 'next/head';

import { Box } from '@chakra-ui/react';

import {
  CreateDAOExistingToken,
} from '../../components/dao/dao-create-existing-token';
import { CreateDAONewToken } from '../../components/dao/dao-create-new-token';
import { DAOTypeSelector } from '../../components/dao/dao-type-selector';
import { RecentlyDeployed } from '../../components/dao/recently-deployed';
import BoxW from '../../components/ui/box';
import ContainerPage from '../../components/ui/container-page';
import PageHeader from '../../components/ui/page-header';
import Layout from '../../layout/Layout';
import { DAOType } from '../../types/dao';

// Around 4 hours
const BLOCK_COUNT = 3000;

const CreateDAOPage = () => {
  const [daoType, setDAOType] = useState<DAOType>(DAOType.NewTokenDAO);

  return (
    <Layout>
      <ContainerPage>
        <Head>
          <title>Create a DAO</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box textAlign="center">
          <PageHeader
            title="Create a new DAO"
            imgSource="/static/images/rocket.png"
          />
          <Box display="flex" flexDirection="row" alignItems="flex-start">
            <BoxW width="fit-content" m="auto">
              {daoType === DAOType.NewTokenDAO && <CreateDAONewToken />}
              {daoType === DAOType.ExistingTokenDAO && (
                <CreateDAOExistingToken />
              )}
            </BoxW>
            <DAOTypeSelector setDAOType={setDAOType} />
          </Box>
        </Box>
        <Box>
          <PageHeader
            title="Recently deployed (last 4 hours)"
            imgSource="/static/images/ship2.png"
          />
          <Box m="auto">
            <RecentlyDeployed blockCount={BLOCK_COUNT} />
          </Box>
        </Box>
      </ContainerPage>
    </Layout>
  );
};

export default CreateDAOPage;
