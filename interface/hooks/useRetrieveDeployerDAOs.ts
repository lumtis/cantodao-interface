import { useEffect, useState } from "react";

import { ethers } from "ethers";
import { useProvider } from "wagmi";

import DAOFactory from "../abis/DAOFactory.json";
import { addresses } from "../config/addresses";

const useRetrieveDeployerDAOs = (deployer?: string) => {
  const provider = useProvider();
  const [daos, setDAOs] = useState<string[]>([]);

  // factory address and abi
  const factoryAddress = addresses.localhost.daoFactory;
  const factoryAbi = DAOFactory.abi;

  // create event filter
  const contract = new ethers.Contract(factoryAddress, factoryAbi, provider);
  const eventSignature = ethers.utils.id(
    "DAOCreated(address,address,address,address,address)"
  );

  useEffect(() => {
    const getEvents = async (address: string) => {
      const eventFilter: ethers.providers.Filter = {
        fromBlock: 0,
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

    if (deployer) {
      getEvents(deployer);
    }
  }, [deployer]);

  return daos;
};

export default useRetrieveDeployerDAOs;
