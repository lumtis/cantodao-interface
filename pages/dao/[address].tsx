import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Box, Spinner } from "@chakra-ui/react";

import { Dao } from "../../components/dao/dao";
import { Proposals } from "../../components/proposal/proposals";
import BoxW from "../../components/ui/box";
import Button from "../../components/ui/button";
import ContainerPage from "../../components/ui/container-page";
import PageHeader from "../../components/ui/page-header";
import useQueryDAOInfo from "../../hooks/queries/useQueryDAOInfo";
import Layout from "../../layout/Layout";

const DaoPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { daoInfo, error, isLoading } = useQueryDAOInfo(address as string);

  return (
    <Layout>
      <Head>
        <title>DAO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContainerPage>
        <Box>
          {!isLoading && !error && daoInfo ? (
            <Box>
              <PageHeader
                title={daoInfo.name}
                imgSource="/static/images/computer.png"
              />
              <Box display="flex" flexDirection="row" alignItems="flex-start">
                <Box w="100%">
                  <BoxW w="100%">
                    <Dao daoInfo={daoInfo} />
                  </BoxW>
                </Box>
                <Box ml={20} w="100%">
                  <Link href={"/treasury/" + address}>
                    <BoxW
                      mb={8}
                      _hover={{
                        cursor: "pointer",
                        bg: "primarydarkest",
                      }}
                    >
                      <PageHeader
                        title="Treasury"
                        imgSource="/static/images/vault.png"
                        marginBottom="0px"
                        fontSize="40px"
                      />
                    </BoxW>
                  </Link>
                  <Link href={"/membership/" + address}>
                    <BoxW
                      mb={8}
                      _hover={{
                        cursor: "pointer",
                        bg: "primarydarkest",
                      }}
                    >
                      <PageHeader
                        title="Membership"
                        imgSource="/static/images/cosmonaut.png"
                        marginBottom="0px"
                        fontSize="40px"
                      />
                    </BoxW>
                  </Link>
                </Box>
              </Box>
              <Box
                mt={16}
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
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
  );
};

export default DaoPage;
