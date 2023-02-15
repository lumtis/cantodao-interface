import { BigNumber } from "ethers";
import Head from "next/head";

import { Box } from "@chakra-ui/react";

import { TxInfo } from "../components/tx/tx-info";
import Button from "../components/ui/button";
import ContainerPage from "../components/ui/container-page";
import PageHeader from "../components/ui/page-header";
import useTxCreateDAO from "../hooks/txs/useTxCreateDAO";
import Layout from "../layout/Layout";

const CreatePage = () => {
  const {
    data,
    isLoading: isLoadingTx,
    isSuccess: isSuccessTx,
    write,
  } = useTxCreateDAO(
    "haha DAO",
    "https://i.imgur.com/J2Awq0y.png",
    "Hahacoin",
    "HAHA",
    BigNumber.from(1000000)
  );
  const txHash = data?.hash;

  return (
    <Layout>
      <ContainerPage>
        <Head>
          <title>Create a DAO</title>
        </Head>
        <Box textAlign="center">
          <PageHeader
            title="Create a new DAO"
            imgSource="/static/images/rocket.png"
          />
          {!isSuccessTx && !txHash && !isLoadingTx && (
            <Button disabled={!write} onClick={() => write?.()}>
              Send
            </Button>
          )}
          <TxInfo
            isLoadingTx={isLoadingTx}
            isSuccessTx={isSuccessTx}
            txHash={txHash}
          />
        </Box>
      </ContainerPage>
    </Layout>
  );
};

export default CreatePage;
