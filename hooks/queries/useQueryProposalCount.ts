import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';

import { DAOProposer__factory } from '../../types/ethers-contracts';

const useQueryProposalCount = (
  contractAddress?: string
): {
  count?: BigNumber;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data: count,
    error,
    isLoading,
  }: {
    data?: BigNumber;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: DAOProposer__factory.abi,
    functionName: "proposalCount",
  });

  return { count, error, isLoading };
};

export default useQueryProposalCount;
