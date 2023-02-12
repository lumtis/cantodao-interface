import { useRouter } from "next/router";

import { Box, Spinner } from "@chakra-ui/react";

import BoxW from "../../../components/ui/box";
import ContainerPage from "../../../components/ui/container-page";
import PageHeader from "../../../components/ui/page-header";
import useQueryDAOInfo from "../../../hooks/queries/useQueryDAOInfo";
import Layout from "../../../layout/Layout";

const NewProposalPage = () => {
  const router = useRouter();
  const { address } = router.query;

  const { daoInfo, error, isLoading } = useQueryDAOInfo(address as string);

  let content = <Spinner />;
  if (!isLoading && !error && daoInfo) {
    content = (
      <Box>
        <PageHeader
          title={"New proposal for " + daoInfo?.name}
          imgSource="/static/images/scroll.png"
        />
        <BoxW width="fit-content">Form here</BoxW>
      </Box>
    );
  }

  return (
    <Layout>
      <ContainerPage>
        <Box>{content}</Box>
      </ContainerPage>
    </Layout>
  );
};

export default NewProposalPage;
