import { BigNumber } from 'ethers';

export enum DAOType {
  NewTokenDAO,
  ExistingTokenDAO,
}

export enum VotingModuleType {
  DAOToken = 0,
  DAOWrappedToken = 1,
}

export const VotingModudeTypeToString = (
  votingModule: VotingModuleType
): string => {
  switch (votingModule) {
    case VotingModuleType.DAOToken:
      return "Independent governance token";
    case VotingModuleType.DAOWrappedToken:
      return "Existing token based";
    default:
      return "Unknown";
  }
};

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
