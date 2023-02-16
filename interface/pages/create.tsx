import { useState } from "react";

import { BigNumber } from "ethers";
import Head from "next/head";

import { Box, Input, Text } from "@chakra-ui/react";

import { TxInfo } from "../components/tx/tx-info";
import BoxW from "../components/ui/box";
import Button from "../components/ui/button";
import ContainerPage from "../components/ui/container-page";
import ContainerSpaced from "../components/ui/container-spaced";
import PageHeader from "../components/ui/page-header";
import useTxCreateDAO from "../hooks/txs/useTxCreateDAO";
import Layout from "../layout/Layout";

const CreatePage = () => {
  const [daoName, setDaoName] = useState("My DAO");
  const [daoImage, setDaoImage] = useState("");
  const [tokenName, setTokenName] = useState("My DAO token");
  const [tokenSymbol, setTokenSymbol] = useState("DAOX");
  const [tokenSupply, setTokenSupply] = useState("1000000");

  const supply = Number(tokenSupply);

  const {
    data,
    isLoading: isLoadingTx,
    isSuccess: isSuccessTx,
    write,
  } = useTxCreateDAO(
    daoName,
    daoImage,
    tokenName,
    tokenSymbol,
    !Number.isNaN(supply) ? BigNumber.from(supply) : BigNumber.from(0)
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
          <BoxW width="fit-content" m="auto">
            <ContainerSpaced>
              <Box display="flex" flexDirection="row" alignItems="flex-end">
                <Text mr={6}>DAO name: </Text>
                <Input
                  width="fit-content"
                  ml="auto"
                  id="daoName"
                  name="daoName"
                  value={daoName}
                  onChange={(event: any) => setDaoName(event.target.value)}
                />
              </Box>
              <Box display="flex" flexDirection="row" alignItems="flex-end">
                <Text mr={6}>DAO image URL: </Text>
                <Input
                  width="fit-content"
                  ml="auto"
                  id="daoImage"
                  name="daoImage"
                  value={daoImage}
                  onChange={(event: any) => setDaoImage(event.target.value)}
                />
              </Box>
              <Box display="flex" flexDirection="row" alignItems="flex-end">
                <Text mr={6}>DAO token name: </Text>
                <Input
                  width="fit-content"
                  ml="auto"
                  id="tokenName"
                  name="tokenName"
                  value={tokenName}
                  onChange={(event: any) => setTokenName(event.target.value)}
                />
              </Box>
              <Box display="flex" flexDirection="row" alignItems="flex-end">
                <Text mr={6}>DAO token symbol: </Text>
                <Input
                  width="fit-content"
                  ml="auto"
                  id="tokenSymbol"
                  name="tokenSymbol"
                  value={tokenSymbol}
                  onChange={(event: any) => setTokenSymbol(event.target.value)}
                />
              </Box>
              <Box display="flex" flexDirection="row" alignItems="flex-end">
                <Text mr={6}>Initial supply: </Text>
                <Input
                  width="fit-content"
                  ml="auto"
                  id="tokenSupply"
                  name="tokenSupply"
                  value={tokenSupply}
                  type="number"
                  onChange={(event: any) =>
                    setTokenSupply(event.target.value || "0")
                  }
                />
              </Box>
              {!isSuccessTx && !txHash && !isLoadingTx && (
                <Box m="auto" pt={8}>
                  <Button disabled={!write} onClick={() => write?.()}>
                    Create DAO
                  </Button>
                </Box>
              )}
              <TxInfo
                isLoadingTx={isLoadingTx}
                isSuccessTx={isSuccessTx}
                txHash={txHash}
              />
            </ContainerSpaced>
          </BoxW>
        </Box>
      </ContainerPage>
    </Layout>
  );
};

export default CreatePage;
