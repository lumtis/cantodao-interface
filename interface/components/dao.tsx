import { Box, Heading, Image, Spinner, Text } from "@chakra-ui/react";

import { DAOInfo } from "../hooks/queries/useQueryDAOInfo";
import useQueryTokenInfo from "../hooks/queries/useTokenInfo";
import ContainerSpaced from "./ui/container-spaced";
import Param from "./ui/param";
import ParamCopyCard from "./ui/param-copy-card";

export const Dao = ({
  daoInfo,
  logoSize,
}: {
  daoInfo?: DAOInfo;
  logoSize?: string;
}) => {
  const { tokenInfo, error, isLoading } = useQueryTokenInfo(daoInfo?.token);

  return (
    <ContainerSpaced>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Heading>{daoInfo?.name}</Heading>
        <Box margin={10} border="4px" borderColor="secondary">
          <Image
            src={daoInfo?.imageURL || "/static/images/planet.png"}
            alt="DAO logo"
            minH={logoSize || 30}
            minW={logoSize || 30}
          />
        </Box>
      </Box>
      <Heading fontSize={{ sm: "3xl", md: "4xl" }}>Parameters:</Heading>
      {daoInfo && (
        <ContainerSpaced>
          <Param
            name="Quorum votes"
            value={daoInfo?.quorumVotes?.toString() + " vote(s)"}
          />
          <Param
            name="Voting delay"
            value={daoInfo?.votingDelay?.toString() + " block(s)"}
          />
          <Param
            name="Voting period"
            value={daoInfo?.votingPeriod?.toString() + " block(s)"}
          />
        </ContainerSpaced>
      )}
      <Heading fontSize={{ sm: "3xl", md: "4xl" }}>Governance token:</Heading>
      {!isLoading && !error && tokenInfo && daoInfo ? (
        <ContainerSpaced>
          <Text>Name: {tokenInfo?.name}</Text>
          <Param
            name="Total supply"
            value={tokenInfo?.totalSupply?.toString() + " " + tokenInfo?.symbol}
          />
          <ParamCopyCard name="Address" value={daoInfo?.token} />
        </ContainerSpaced>
      ) : (
        <Spinner />
      )}
    </ContainerSpaced>
  );
};
