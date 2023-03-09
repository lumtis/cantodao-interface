import {
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';

import useQueryVotingModuleType
  from '../../hooks/queries/useQueryVotingModuleType';
import {
  DAOInfo,
  VotingModudeTypeToString,
  VotingModuleType,
} from '../../types/dao';
import ContainerSpaced from '../ui/container-spaced';
import { TokenInfo } from './token-info';
import { UnderlyingInfo } from './underlying-info';

export const VotingModule = ({ daoInfo }: { daoInfo?: DAOInfo }) => {
  const { votingModule, error, isLoading } = useQueryVotingModuleType(
    daoInfo?.votingModule
  );

  return (
    <>
      {votingModule && !isLoading && !error ? (
        <ContainerSpaced spacing={8}>
          <Text>
            Voting module type: {VotingModudeTypeToString(votingModule)}
          </Text>
          <Heading fontSize="30px">Governance token:</Heading>
          <TokenInfo address={daoInfo?.votingModule} />
          {votingModule === VotingModuleType.DAOWrappedToken && (
            <UnderlyingInfo address={daoInfo?.votingModule} />
          )}
        </ContainerSpaced>
      ) : (
        <Spinner />
      )}
    </>
  );
};
