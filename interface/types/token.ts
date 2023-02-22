import { BigNumber, utils } from "ethers";

export const DAOTokenDecimals = 18;

export type TokenInfo = {
  address?: string;
  name?: string;
  symbol?: string;
  totalSupply?: BigNumber;
  decimals?: number;
};

export const FormatToken = (
  amount: BigNumber,
  tokenInfo: TokenInfo
): string => {
  return (
    utils.formatUnits(amount, tokenInfo.decimals) + "$" + tokenInfo?.symbol
  );
};

export const ParseToken = (amount: string, decimals: number): BigNumber => {
  return utils.parseUnits(amount, decimals);
};
