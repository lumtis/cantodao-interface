import { BigNumber } from 'ethers';
import ms from 'pretty-ms';

export const NullAddress: `0x${string}` =
  "0x0000000000000000000000000000000000000000";

export const BlocksToTime = (blocks: number, blockTime: number): string => {
  return ms(blocks * blockTime * 1000);
};

export const BlockIntervalToTime = (
  currentBlock: number,
  referenceBlock: number,
  blockTime: number
): string => {
  if (currentBlock < referenceBlock) {
    return "within " + BlocksToTime(referenceBlock - currentBlock, blockTime);
  } else if (currentBlock > referenceBlock) {
    return BlocksToTime(currentBlock - referenceBlock, blockTime) + " ago";
  } else {
    return "now";
  }
};

export const TimeToBlocks = (time: string, blockTime: number): BigNumber => {
  return BigNumber.from(time).div(blockTime);
};
