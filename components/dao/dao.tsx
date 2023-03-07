import { BigNumber } from 'ethers';

import {
  Box,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';

import { blockTime } from '../../config/chain';
import { DAOInfo } from '../../types/dao';
import { BlocksToTime } from '../../types/evm';
import ContainerSpaced from '../ui/container-spaced';
import Param from '../ui/param';

export const Dao = ({
  daoInfo,
  logoSize,
}: {
  daoInfo?: DAOInfo;
  logoSize?: string;
}) => {
  // Get voting period
  const votingPeriod = BlocksToTime(
    daoInfo?.votingPeriod?.toNumber() || 0,
    blockTime
  );

  // Get voting delay
  const votingDelay = BlocksToTime(
    daoInfo?.votingDelay?.toNumber() || 0,
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
            src={daoInfo?.imageURL || "/static/images/logo2.png"}
            alt="DAO logo"
            minH={logoSize || 30}
            minW={logoSize || 30}
            maxH={logoSize || 150}
            maxW={logoSize || 150}
          />
        </Box>
      </Box>
      <Text>{daoInfo?.description}</Text>
      <Heading fontSize={{ sm: "3xl", md: "4xl" }}>Parameters:</Heading>
      {daoInfo && (
        <ContainerSpaced>
          <Param name="Quorum percent" value={quorumPercent.toString() + "%"} />
          <Param name="Voting delay" value={votingDelay} />
          <Param name="Voting period" value={votingPeriod} />
        </ContainerSpaced>
      )}
    </ContainerSpaced>
  );
};
