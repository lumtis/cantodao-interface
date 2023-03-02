import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  Box,
  Spinner,
  Text,
} from '@chakra-ui/react';

import { Balances } from '../../components/balances';
import { CSRList } from '../../components/csr/csr-list';
import BoxW from '../../components/ui/box';
import ContainerPage from '../../components/ui/container-page';
import ContainerSpaced from '../../components/ui/container-spaced';
import { CopyCard } from '../../components/ui/copy-card';
import PageHeader from '../../components/ui/page-header';
import { RouteCard } from '../../components/ui/route-card';
import {
  GetNoteAddress,
  GetTurnstileAddress,
} from '../../config/addresses';
import useQueryDAOInfo from '../../hooks/queries/useQueryDAOInfo';
import Layout from '../../layout/Layout';

const TreasuryPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { daoInfo, error, isLoading } = useQueryDAOInfo(address as string);

  return (
    <Layout>
      <Head>
        <title>Treasury</title>
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
        <PageHeader title="Treasury" imgSource="/static/images/vault.png" />
        <Box display="flex" flexDirection="row" alignItems="flex-start">
          <Text fontSize="30px" mr={8}>
            Treasury Address:
          </Text>
          <CopyCard w={300} address={address as string} />
        </Box>
        <Box>
          {!isLoading && !error && daoInfo ? (
            <Box>
              <Box display="flex" flexDirection="row" alignItems="flex-start">
                <Box w="100%">
                  <PageHeader
                    title="Tokens"
                    imgSource="/static/images/coins.png"
                  />
                  <BoxW w="100%">
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
                    </ContainerSpaced>
                  </BoxW>
                </Box>
                <Box ml={20} w="100%">
                  <PageHeader
                    title="CSR"
                    imgSource="/static/images/nuclear.png"
                  />
                  <BoxW w="100%" mb="40px">
                    <CSRList
                      holderAddress={address as string}
                      csrContract={GetTurnstileAddress()}
                    />
                  </BoxW>
                </Box>
              </Box>
              <Box mt={8}>
                <PageHeader title="NFTs" imgSource="/static/images/gem.png" />
                <Text>The DAO has no NFT</Text>
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

export default TreasuryPage;
