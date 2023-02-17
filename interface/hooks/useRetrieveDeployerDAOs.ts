import { useEffect, useState } from "react";

import { ethers } from "ethers";
import { useBlockNumber, useProvider } from "wagmi";

import DAOFactory from "../abis/DAOFactory.json";
import { GetDaoFactoryAddress } from "../config/addresses";

// Retrieved deployed DAOs by an address
// blockCount is the number of last blocks to reach for the events
const useRetrieveDeployerDAOs = (blockCount: number, deployer?: string) => {
  const provider = useProvider();
  const [daos, setDAOs] = useState<string[]>([]);

  const { data: blockNumber, isError, isLoading } = useBlockNumber();

  const startBlock =
    blockNumber && !isError && !isLoading
      ? blockNumber > blockCount
        ? blockNumber - blockCount
        : 0
      : null;

  // factory address and abi
  const factoryAddress = GetDaoFactoryAddress();
  const factoryAbi = DAOFactory.abi;

  // create event filter
  const contract = new ethers.Contract(factoryAddress, factoryAbi, provider);
  const eventSignature = ethers.utils.id(
    "DAOCreated(address,address,address,address,address)"
  );

  useEffect(() => {
    const getEvents = async (address: string, fromBlock: number) => {
      const eventFilter: ethers.providers.Filter = {
        fromBlock,
        address: factoryAddress,
        topics: [eventSignature, ethers.utils.hexZeroPad(address, 32)],
      };
      const eventFragment = contract.interface.getEvent(eventSignature);

      const logs = await provider.getLogs(eventFilter);
      const retrievedDAOs = logs.map(
        (log) =>
          contract.interface.decodeEventLog(eventFragment, log.data)["dao"]
      );
      setDAOs(retrievedDAOs);
    };

    if (deployer && startBlock !== null) {
      getEvents(deployer, startBlock);
    }
  }, [deployer, startBlock]);

  return daos;
};

export default useRetrieveDeployerDAOs;
