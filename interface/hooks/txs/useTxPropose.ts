import { BigNumber, BytesLike } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import DAOProposer from "../../abis/DAOProposer.json";

const useTxPropose = (
  contractAddress: string,
  targetAddress: string,
  amount: BigNumber,
  calldata: BytesLike,
  description: string
) => {
  const address = contractAddress as `0x${string}`;
  const abi = DAOProposer.abi;

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: "propose",
    args: [[targetAddress], [amount], [calldata], description],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
};

export default useTxPropose;
