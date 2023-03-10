import { useState } from 'react';

import { BigNumber } from 'ethers';

import {
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';

import { blockTime } from '../../config/chain';
import useTxCreateDAOExistingToken
  from '../../hooks/txs/useTxCreateDAOExistingToken';
import {
  NullAddress,
  TimeToBlocks,
} from '../../types/evm';
import {
  DAOTokenDecimals,
  ParseToken,
} from '../../types/token';
import { TxInfo } from '../tx/tx-info';
import Button from '../ui/button';
import ContainerSpaced from '../ui/container-spaced';
import Divider from '../ui/divider';
import Input from '../ui/input';

export const CreateDAOExistingToken = () => {
  const [daoName, setDaoName] = useState("My DAO");
  const [daoDescription, setDaoDescription] = useState("This is my new DAO");
  const [daoImage, setDaoImage] = useState("");

  const [quorumFraction, setQuorumFraction] = useState("40");
  const [votingDelay, setVotingDelay] = useState("0");
  const [votingPeriod, setVotingPeriod] = useState("3600");

  const [assetToken, setAssetToken] = useState(NullAddress);

  const [minimalVotingPower, setMinimalVotingPower] = useState("0");

  const {
    data,
    isLoading: isLoadingTx,
    isSuccess: isSuccessTx,
    write,
  } = useTxCreateDAOExistingToken(
    daoName,
    daoDescription,
    daoImage,
    assetToken,
    BigNumber.from(quorumFraction),
    TimeToBlocks(votingDelay, blockTime),
    TimeToBlocks(votingPeriod, blockTime),
    ParseToken(minimalVotingPower, DAOTokenDecimals)
  );
  const txHash = data?.hash;

  return (
    <ContainerSpaced>
      <Heading fontSize="30px">General information</Heading>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Text w="200px" mr={6}>
          DAO name:{" "}
        </Text>
        <Input
          width="fit-content"
          ml="auto"
          id="daoName"
          name="daoName"
          value={daoName}
          onChange={(event: any) => setDaoName(event.target.value)}
        />
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Text w="200px" mr={6}>
          DAO description:{" "}
        </Text>
        <Input
          as="textarea"
          minH="150px"
          width="fit-content"
          ml="auto"
          id="daoDescription"
          name="daoDescription"
          value={daoDescription}
          onChange={(event: any) => setDaoDescription(event.target.value)}
        />
      </Box>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Text w="200px" mr={6}>
          DAO image URL:{" "}
        </Text>
        <Input
          width="fit-content"
          ml="auto"
          id="daoImage"
          name="daoImage"
          value={daoImage}
          onChange={(event: any) => setDaoImage(event.target.value)}
        />
      </Box>
      <Divider />
      <Heading fontSize="30px">Parameters</Heading>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Text w="200px" mr={6}>
          Quorum percent:{" "}
        </Text>
        <Input
          width="fit-content"
          ml="auto"
          id="quorumFraction"
          name="quorumFraction"
          value={quorumFraction}
          type="number"
          onChange={(event: any) =>
            setQuorumFraction(event.target.value || "0")
          }
        />
      </Box>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Text w="200px" mr={6}>
          Voting delay (s):{" "}
        </Text>
        <Input
          width="fit-content"
          ml="auto"
          id="votingDelay"
          name="votingDelay"
          value={votingDelay}
          type="number"
          onChange={(event: any) => setVotingDelay(event.target.value || "0")}
        />
      </Box>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Text w="200px" mr={6}>
          Voting period (s):{" "}
        </Text>
        <Input
          width="fit-content"
          ml="auto"
          id="votingPeriod"
          name="votingPeriod"
          value={votingPeriod}
          type="number"
          onChange={(event: any) => setVotingPeriod(event.target.value || "0")}
        />
      </Box>
      <Divider />
      <Heading fontSize="30px">Governance token</Heading>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Text w="200px" mr={6}>
          Underlying token:{" "}
        </Text>
        <Input
          width="fit-content"
          ml="auto"
          id="assetToken"
          name="assetToken"
          value={assetToken}
          onChange={(event: any) => setAssetToken(event.target.value)}
        />
      </Box>
      <Divider />
      <Heading fontSize="30px">Proposer options</Heading>
      <Box display="flex" flexDirection="row" alignItems="flex-end">
        <Text w="200px" mr={6}>
          Minimal voting power:{" "}
        </Text>
        <Input
          width="fit-content"
          ml="auto"
          id="minimalVotingPower"
          name="minimalVotingPower"
          value={minimalVotingPower}
          type="number"
          step="any"
          onChange={(event: any) =>
            setMinimalVotingPower(event.target.value || "0")
          }
        />
      </Box>
      {!isSuccessTx && !txHash && !isLoadingTx && (
        <Box m="auto" pt={8}>
          <Button disabled={!write} onClick={() => write?.()}>
            Create DAO
          </Button>
        </Box>
      )}
      <TxInfo
        isLoadingTx={isLoadingTx}
        isSuccessTx={isSuccessTx}
        txHash={txHash}
      />
    </ContainerSpaced>
  );
};
