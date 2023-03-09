import { useState } from 'react';

import {
  BigNumber,
  utils,
} from 'ethers';

import {
  Spinner,
  Text,
} from '@chakra-ui/react';

import useQueryAvailableVotes from '../../hooks/queries/useQueryAvailableVotes';
import useQueryVotingModuleType
  from '../../hooks/queries/useQueryVotingModuleType';
import useAccountWrapped from '../../hooks/useAccount';
import {
  DAOInfo,
  VotingModuleType,
} from '../../types/dao';
import { NullAddress } from '../../types/evm';
import { DAOTokenDecimals } from '../../types/token';
import { Delegate } from '../delegate';
import { Balance } from '../token/balance';
import ContainerSpaced from '../ui/container-spaced';
import Divider from '../ui/divider';
import Param from '../ui/param';
import { UnderlyingBalance } from './underlying-balance';

export const VotingPower = ({ daoInfo }: { daoInfo: DAOInfo }) => {
  const { address, isConnected } = useAccountWrapped();
  const [balance, setBalance] = useState<BigNumber | undefined>(undefined);

  const {
    votes,
    error: errorVotes,
    isLoading: isLoadingVotes,
  } = useQueryAvailableVotes(address || NullAddress, daoInfo?.votingModule);

  const {
    votingModule,
    error: errorVotingModule,
    isLoading: isLoadingVotingModule,
  } = useQueryVotingModuleType(daoInfo?.votingModule);

  const selfDelegateAvailable = balance && votes && balance.gt(votes);

  const shoudlAcquireToken =
    balance && votes && balance.isZero() && votes.isZero();

  return (
    <ContainerSpaced spacing={8}>
      {isConnected && address && daoInfo?.votingModule ? (
        <Balance
          contractAddress={daoInfo?.votingModule}
          holderAddress={address}
          setBalance={setBalance}
        />
      ) : (
        <Spinner />
      )}
      {votes && !errorVotes && !isLoadingVotes ? (
        <Param
          name="Voting power"
          value={utils.formatUnits(votes, DAOTokenDecimals)}
        />
      ) : (
        <Spinner />
      )}
      {!shoudlAcquireToken && (
        <ContainerSpaced>
          {selfDelegateAvailable && (
            <Text>
              Delegate your balance to yourself to acquire voting power
            </Text>
          )}
          <Delegate
            header={"Delegate voting power"}
            buttonText="Delegate voting power"
            address={daoInfo?.votingModule}
            defaultRecipient={address}
          />
        </ContainerSpaced>
      )}
      {shoudlAcquireToken && (
        <ContainerSpaced>
          <Divider />
          <Text>Get governance tokens to acquire voting power.</Text>
        </ContainerSpaced>
      )}
      {!isLoadingVotingModule &&
        !errorVotingModule &&
        votingModule &&
        votingModule === VotingModuleType.DAOWrappedToken && (
          <UnderlyingBalance
            address={address || NullAddress}
            votingModuleAddress={daoInfo?.votingModule}
          />
        )}
    </ContainerSpaced>
  );
};
