import { BigNumber } from 'ethers';
import {
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

import { DAOGovernor__factory } from '../../types/ethers-contracts';
import { Vote } from '../../types/proposal';

const useTxCastVote = (
  proposalID: BigNumber,
  vote: Vote,
  contractAddress?: string
) => {
  const address = contractAddress as `0x${string}`;
  const abi = DAOGovernor__factory.abi;

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: "castVote",
    args: [proposalID, vote],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
};

export default useTxCastVote;
