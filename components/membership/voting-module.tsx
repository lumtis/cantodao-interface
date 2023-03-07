import {
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';

import useQueryTokenInfo from '../../hooks/queries/useTokenInfo';
import { DAOInfo } from '../../types/dao';
import { FormatToken } from '../../types/token';
import ContainerSpaced from '../ui/container-spaced';
import Param from '../ui/param';
import ParamCopyCard from '../ui/param-copy-card';

export const VotingModule = ({ daoInfo }: { daoInfo?: DAOInfo }) => {
  const { tokenInfo, error, isLoading } = useQueryTokenInfo(
    daoInfo?.votingModule
  );

  return (
    <ContainerSpaced>
      <Heading fontSize={{ sm: "3xl", md: "4xl" }}>Governance token:</Heading>
      {!isLoading && !error && tokenInfo && tokenInfo.totalSupply && daoInfo ? (
        <ContainerSpaced>
          <Text>Name: {tokenInfo?.name}</Text>
          <Param
            name="Total supply"
            value={FormatToken(tokenInfo.totalSupply, tokenInfo)}
          />
          <ParamCopyCard name="Address" value={daoInfo?.votingModule} />
        </ContainerSpaced>
      ) : (
        <Spinner />
      )}
    </ContainerSpaced>
  );
};
