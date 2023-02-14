import { BigNumber, BytesLike } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import DAOGovernor from "../../abis/DAOGovernor.json";

const useTxPropose = (
  contractAddress: string,
  targetAddress: string,
  amount: BigNumber,
  calldata: BytesLike,
  description: string
) => {
  const address = contractAddress as `0x${string}`;
  const abi = DAOGovernor.abi;

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: "propose(address[],uint256[],bytes[],string)",
    args: [[targetAddress], [amount], [calldata], description],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
};

export default useTxPropose;
