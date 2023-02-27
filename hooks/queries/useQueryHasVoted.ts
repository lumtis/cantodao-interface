import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';

import { DAOGovernor__factory } from '../../types/ethers-contracts';
import { NullAddress } from '../../types/evm';

const useQueryHasVoted = (
  proposalId?: BigNumber,
  voter?: string,
  contractAddress?: string
): {
  voted?: boolean;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data: voted,
    error,
    isLoading,
  }: {
    data?: boolean;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: DAOGovernor__factory.abi,
    functionName: "hasVoted",
    args: [
      proposalId || BigNumber.from(0),
      (voter as `0x${string}`) || NullAddress,
    ],
  });

  return { voted, error, isLoading };
};

export default useQueryHasVoted;
