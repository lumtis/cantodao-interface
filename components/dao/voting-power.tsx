import { useState } from "react";

import { BigNumber, utils } from "ethers";

import { Spinner, Text } from "@chakra-ui/react";

import useQueryAvailableVotes from "../../hooks/queries/useQueryAvailableVotes";
import useAccountWrapped from "../../hooks/useAccount";
import { DAOInfo } from "../../types/dao";
import { DAOTokenDecimals } from "../../types/token";
import { Balance } from "../balance";
import { Delegate } from "../delegate";
import ContainerSpaced from "../ui/container-spaced";
import Divider from "../ui/divider";
import Param from "../ui/param";

export const VotingPower = ({ daoInfo }: { daoInfo: DAOInfo }) => {
  const { address, isConnected } = useAccountWrapped();
  const [balance, setBalance] = useState<BigNumber | undefined>(undefined);

  const { votes, error, isLoading } = useQueryAvailableVotes(
    daoInfo?.token,
    address
  );

  const selfDelegateAvailable = balance && votes && balance.gt(votes);

  const shoudlAcquireToken =
    balance && votes && balance.isZero() && votes.isZero();

  // TODO: Support voting power display for other voting types
  return (
    <ContainerSpaced>
      {isConnected && address && daoInfo?.token ? (
        <Balance
          contractAddress={daoInfo?.token}
          holderAddress={address}
          setBalance={setBalance}
        />
      ) : (
        <Spinner />
      )}
      {votes && !error && !isLoading ? (
        <Param
          name="Voting power"
          value={utils.formatUnits(votes, DAOTokenDecimals)}
        />
      ) : (
        <Spinner />
      )}
      {selfDelegateAvailable && (
        <ContainerSpaced>
          <Divider />
          <Text>Delegate your balance to yourself to acquire voting power</Text>
          <Delegate
            header={"Delegate voting power"}
            buttonText="Delegate voting power"
            address={daoInfo?.token}
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
    </ContainerSpaced>
  );
};
