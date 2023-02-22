import { BigNumber, utils } from "ethers";
import { erc20ABI } from "wagmi";

// Returns the args associated with a token transfer calldata
export const ParseTokenTransferArgs = (
  calldata: string
): {
  recipient: string;
  amount: BigNumber;
} | null => {
  const iface = new utils.Interface(erc20ABI);
  const decoded = iface.parseTransaction({ data: calldata });
  if (decoded.name === "transfer") {
    return {
      recipient: decoded.args[0],
      amount: decoded.args[1],
    };
  }
  return null;
};
