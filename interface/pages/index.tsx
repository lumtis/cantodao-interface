import Head from 'next/head';

import {
  Box,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';

import ContainerPage from '../components/ui/container-page';
import Layout from '../layout/Layout';

const WelcomeText =
  "Cantodao is a DAO system built on Canto network. Cantodao is fully open-source, impregnated with the freedom culture of Canto, and is aimed to become the simplest and easiest-to-use DAO system.";

const HomePage = () => {
  return (
    <Layout>
      <ContainerPage>
        <Head>
          <title>Cantodao</title>
          <meta name="description" content="DAOs for Canto" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box textAlign="center">
          <Image m="auto" src="/static/images/man.png" maxW={20} maxH={20} />
          <Heading>Welcome to cantodao</Heading>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Text textAlign="left" fontSize="30px" m="auto" mt="20" mb="20" w={600}>
              {WelcomeText}
            </Text>
            <Image m="auto" src="/static/images/space.png" w={500} />
          </Box>
          <Box display="flex" flexDirection="row" alignItems="flex-end">
            <Image m="auto" src="/static/images/beach.png" w={400} />
            <Text textAlign="left" fontSize="30px" ml="20px" mt="20" mb="20" w={600}>
              -> Explore the DAOs
              -> Create your DAO
            </Text>
          </Box>
        </Box>
      </ContainerPage>
    </Layout>
  );
};

export default HomePage;
