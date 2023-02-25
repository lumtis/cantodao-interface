import { utils } from "ethers";
import { erc20ABI } from "wagmi";

// Calldata recognized by the UI
export enum CalldataType {
  Unknown,
  CoinsTransfer,
  TokensTransfer,
}

// Retrieve the type of the calldata from its content
export const ParseCalldataType = (calldata: string): CalldataType => {
  if (calldata === "0x") {
    return CalldataType.CoinsTransfer;
  }

  // Check from ERC20 interface
  const iface = new utils.Interface(erc20ABI);
  try {
    const decoded = iface.parseTransaction({ data: calldata });
    if (decoded.name === "transfer") {
      return CalldataType.TokensTransfer;
    }
  } catch (_) {
    // Do nothing
  }

  return CalldataType.Unknown;
};
