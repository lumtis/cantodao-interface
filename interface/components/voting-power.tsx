import { Spinner, Text } from "@chakra-ui/react";

import useQueryAvailableVotes from "../hooks/queries/useQueryAvailableVotes";
import { DAOInfo } from "../hooks/queries/useQueryDAOInfo";
import useTxDelegate from "../hooks/txs/useTxDelegate";
import useAccountWrapped from "../hooks/useAccount";
import { Balance } from "./balance";
import Button from "./ui/button";
import ContainerSpaced from "./ui/container-spaced";
import Divider from "./ui/divider";
import Param from "./ui/param";

export const VotingPower = ({ daoInfo }: { daoInfo: DAOInfo }) => {
  const { address, isConnected } = useAccountWrapped();

  const { votes, error, isLoading } = useQueryAvailableVotes(
    daoInfo?.token,
    address
  );

  const {
    data,
    isLoading: isLoadingDelegate,
    isSuccess,
    write,
  } = useTxDelegate(daoInfo?.token, address);

  console.log({
    data,
    isLoadingDelegate,
    isSuccess,
    write,
  });

  // TODO: hide self-delegation part if no token or already delegated
  // TODO: relative voting power
  return (
    <ContainerSpaced>
      {isConnected && address && daoInfo?.token ? (
        <Balance contractAddress={daoInfo?.token} holderAddress={address} />
      ) : (
        <Spinner />
      )}
      {votes && !error && !isLoading ? (
        <Param name="Voting power" value={votes.toString() + " vote(s)"} />
      ) : (
        <Spinner />
      )}
      {write ? (
        <ContainerSpaced>
          <Divider />
          <Text>Delegate your balance to yourself to acquire voting power</Text>
          <Button w="fit-content" onClick={() => write()}>
            Self-Delegate
          </Button>
        </ContainerSpaced>
      ) : (
        <Spinner />
      )}
    </ContainerSpaced>
  );
};
