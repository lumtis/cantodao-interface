import Head from "next/head";

import { Box, Heading } from "@chakra-ui/react";

import ContainerPage from "../components/ui/container-page";
import Layout from "../layout/Layout";

export default function Home() {
  return (
    <Layout>
      <ContainerPage>
        <Head>
          <title>Cantodao</title>
          <meta name="description" content="DAOs for Canto" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box textAlign="center">
          <Heading
            as="h1"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            fontWeight="extrabold"
            mb={3}
          >
            Welcome to cantodao
          </Heading>
        </Box>
      </ContainerPage>
    </Layout>
  );
}
