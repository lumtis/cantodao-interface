import { BigNumber } from 'ethers';

// Regular info of a DAO
export type DAOInfo = {
  name?: string;
  quorumNumerator?: BigNumber;
  proposalThreshold?: BigNumber;
  votingDelay?: BigNumber;
  votingPeriod?: BigNumber;
  votingModule?: string;
  proposer?: string;
  imageURL?: string;
  description?: string;
};
