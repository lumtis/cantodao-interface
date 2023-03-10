import Head from 'next/head';

import {
  Box,
  Heading,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';

import TestnetDisclaimer from '../components/disclaimer-testnet';
import ContainerPage from '../components/ui/container-page';
import { CantoTestnetNetwork } from '../config/addresses';
import Layout from '../layout/Layout';

const welcomeText =
  "Cantodao is a DAO platform built on Canto network. Cantodao is fully open-source, impregnated with the freedom culture of Canto, and is aimed to become the simplest and easiest-to-use DAO platform.";

const arrow = "->";

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
          {process.env.NEXT_PUBLIC_NETWORK === CantoTestnetNetwork && (
            <TestnetDisclaimer />
          )}
          <Image
            m="auto"
            src="/static/images/greeting.png"
            maxW={20}
            maxH={20}
          />
          <Heading>Welcome to cantodao</Heading>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Text
              textAlign="left"
              fontSize="30px"
              m="auto"
              mt="20"
              mb="20"
              w={600}
            >
              {welcomeText}
            </Text>
            <Image m="auto" src="/static/images/satellite.png" w={100} />
          </Box>
          <Box display="flex" flexDirection="row" alignItems="flex-end">
            <Image m="auto" src="/static/images/satellite2.png" w={100} />
            <Box ml="40px" mt="20" mb="20" w={600}>
              <Text textAlign="left" fontSize="40px">
                Features
              </Text>
              <Text textAlign="left" fontSize="30px">
                - Modular architercture
              </Text>
              <Text textAlign="left" fontSize="30px">
                - Create DAO based on existing token
              </Text>
              <Text textAlign="left" fontSize="30px">
                - CSR token support
              </Text>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" alignItems="flex-end">
            <Box ml="auto" mt="20" mb="20" w="fit-content">
              <Text textAlign="left" fontSize="40px">
                Getting started
              </Text>
              <Link href="/explore">
                <Text textAlign="left" fontSize="30px">
                  {arrow} Explore the listed DAOs
                </Text>
              </Link>
              <Link href="/create/dao">
                <Text textAlign="left" fontSize="30px">
                  {arrow} Create your own DAO
                </Text>
              </Link>
              <Link href="https://github.com/lumtis/cantodao">
                <Text textAlign="left" fontSize="30px">
                  {arrow} Source code
                </Text>
              </Link>
            </Box>
            <Image m="auto" src="/static/images/cosmonaut2.png" w={75} />
          </Box>
        </Box>
      </ContainerPage>
    </Layout>
  );
};

export default HomePage;
