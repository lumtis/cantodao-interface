import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';

import { DAOProposer__factory } from '../../types/ethers-contracts';

const useQueryProposalMinimalVotingPower = (
  contractAddress?: string
): {
  minimalVotingPower?: BigNumber;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data: minimalVotingPower,
    error,
    isLoading,
  }: {
    data?: BigNumber;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: DAOProposer__factory.abi,
    functionName: "minimalVotingPower",
  });

  return { minimalVotingPower, error, isLoading };
};

export default useQueryProposalMinimalVotingPower;
