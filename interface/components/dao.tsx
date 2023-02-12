import { Box, Heading, Image, Spinner, Text } from "@chakra-ui/react";

import { DAOInfo } from "../hooks/queries/useQueryDAOInfo";
import useQueryTokenInfo, { TokenInfo } from "../hooks/queries/useTokenInfo";
import ContainerSpaced from "./ui/container-spaced";
import Param from "./ui/param";
import ParamCopyCard from "./ui/param-copy-card";

export const Dao = ({
  address,
  daoInfo,
  logoSize,
}: {
  address: string;
  daoInfo?: DAOInfo;
  logoSize?: string;
}) => {
  const { tokenInfo, error, isLoading } = useQueryTokenInfo(daoInfo?.token);

  // Information about the DAO token
  let tokenComp = <Spinner />;
  if (!isLoading && !error && tokenInfo) {
    tokenComp = DaoToken(daoInfo?.token, tokenInfo);
  }

  return (
    <ContainerSpaced>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Heading>{daoInfo?.name}</Heading>
        <Box margin={10} border="4px" borderColor="secondary">
          <Image
            src={"https://i.imgur.com/J2Awq0y.png"}
            alt="DAO logo"
            h={logoSize || 40}
            w={logoSize || 40}
          />
        </Box>
      </Box>
      <Heading fontSize={{ sm: "3xl", md: "4xl" }}>Parameters:</Heading>
      {daoInfo && DaoParameters(daoInfo)}
      <Heading fontSize={{ sm: "3xl", md: "4xl" }}>Governance token:</Heading>
      {tokenComp}
    </ContainerSpaced>
  );
};

const DaoParameters = (daoInfo: DAOInfo) => {
  return (
    <ContainerSpaced>
      <Param
        name="Quorum votes"
        value={daoInfo?.quorumVotes?.toString() + " vote(s)"}
      />
      <Param
        name="Proposal threshold"
        value={daoInfo?.proposalThreshold?.toString() + " vote(s)"}
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
  );
};

const DaoToken = (tokenAddress?: string, tokenInfo?: TokenInfo) => {
  return (
    <ContainerSpaced>
      <Text>Name: {tokenInfo?.name}</Text>
      <Param
        name="Total supply"
        value={tokenInfo?.totalSupply?.toString() + " " + tokenInfo?.symbol}
      />
      <ParamCopyCard name="Address" value={tokenAddress} />
    </ContainerSpaced>
  );
};
