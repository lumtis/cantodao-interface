import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';

import { DAOProposer__factory } from '../../types/ethers-contracts';

const useQueryProposalID = (
  proposalIndex: BigNumber,
  contractAddress?: string
): {
  proposalID?: BigNumber;
  error: Error | null;
  isLoading: boolean;
} => {
  const address = contractAddress as `0x${string}`;

  const {
    data: proposalID,
    error,
    isLoading,
  }: {
    data?: BigNumber;
    error: Error | null;
    isLoading: boolean;
  } = useContractRead({
    address,
    abi: DAOProposer__factory.abi,
    functionName: "proposalIDs",
    args: [proposalIndex || 0],
  });

  return { proposalID, error, isLoading };
};

export default useQueryProposalID;
