import { BigNumber } from 'ethers';

// Regular info of a DAO
export type DAOInfo = {
  name?: string;
  quorumVotes?: BigNumber;
  proposalThreshold?: BigNumber;
  votingDelay?: BigNumber;
  votingPeriod?: BigNumber;
  token?: string;
  proposer?: string;
  imageURL?: string;
};
