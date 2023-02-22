import { Spinner, Text } from "@chakra-ui/react";

import useQueryTokenInfo from "../../../hooks/queries/useTokenInfo";
import { FormatToken } from "../../../types/token";
import { ParseTokenTransferArgs } from "../../../utils/calldata/erc20";
import { CopyCard } from "../../ui/copy-card";

// TODO: show Canto amount sent in tx
export const TokensTransferAction = ({
  contractAddress,
  calldata,
}: {
  contractAddress: string;
  calldata: string;
}) => {
  const { tokenInfo, error, isLoading } = useQueryTokenInfo(contractAddress);

  const args = ParseTokenTransferArgs(calldata);

  return (
    <>
      {args && !isLoading && !error && tokenInfo ? (
        <Text>
          Transfer {FormatToken(args.amount, tokenInfo)} to{" "}
          <CopyCard address={args.recipient} />
        </Text>
      ) : (
        <Spinner />
      )}
    </>
  );
};
