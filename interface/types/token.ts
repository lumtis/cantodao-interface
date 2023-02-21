import { BigNumber, utils } from "ethers";

export const DAOTokenDecinmals = 18;

export type TokenInfo = {
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
    utils.formatUnits(amount, tokenInfo.decimals) + " " + tokenInfo?.symbol
  );
};

export const ParseToken = (amount: string, tokenInfo: TokenInfo): BigNumber => {
  return utils.parseUnits(amount, tokenInfo.decimals);
};
