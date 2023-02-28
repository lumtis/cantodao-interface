import { BigNumber } from 'ethers';

import {
  Box,
  Heading,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';

import { blockTime } from '../../config/chain';
import useQueryTokenInfo from '../../hooks/queries/useTokenInfo';
import { DAOInfo } from '../../types/dao';
import { BlocksToTime } from '../../types/evm';
import { FormatToken } from '../../types/token';
import ContainerSpaced from '../ui/container-spaced';
import Param from '../ui/param';
import ParamCopyCard from '../ui/param-copy-card';

export const Dao = ({
  daoInfo,
  logoSize,
}: {
  daoInfo?: DAOInfo;
  logoSize?: string;
}) => {
  const { tokenInfo, error, isLoading } = useQueryTokenInfo(daoInfo?.token);

  // Get voting period
  const votingPeriod = BlocksToTime(
    daoInfo?.votingPeriod?.toNumber() || 0,
    blockTime
  );

  // Get quorum
  const quorumPercent = daoInfo?.quorumNumerator || BigNumber.from(0);

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
          <Param name="Quorum percent" value={quorumPercent.toString() + "%"} />
          <Param name="Voting period" value={votingPeriod} />
        </ContainerSpaced>
      )}
      <Heading fontSize={{ sm: "3xl", md: "4xl" }}>Governance token:</Heading>
      {!isLoading && !error && tokenInfo && tokenInfo.totalSupply && daoInfo ? (
        <ContainerSpaced>
          <Text>Name: {tokenInfo?.name}</Text>
          <Param
            name="Total supply"
            value={FormatToken(tokenInfo.totalSupply, tokenInfo)}
          />
          <ParamCopyCard name="Address" value={daoInfo?.token} />
        </ContainerSpaced>
      ) : (
        <Spinner />
      )}
    </ContainerSpaced>
  );
};
