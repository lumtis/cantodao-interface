import { useContractWrite, usePrepareContractWrite } from "wagmi";

import DAOToken from "../../abis/DAOToken.json";

const useTxDelegate = (contractAddress?: string, holderAddress?: string) => {
  const address = contractAddress as `0x${string}`;

  const { config } = usePrepareContractWrite({
    address,
    abi: DAOToken.abi,
    functionName: "delegate",
    args: [holderAddress],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
};

export default useTxDelegate;
