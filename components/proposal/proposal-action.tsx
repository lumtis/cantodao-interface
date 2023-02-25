import { Box, Text } from "@chakra-ui/react";

import { ProposalContent } from "../../types/proposal";
import { CalldataType, ParseCalldataType } from "../../utils/calldata/parse";
import ContainerSpaced from "../ui/container-spaced";
import { CantoTransferAction } from "./action/canto-transfer";
import { TokensTransferAction } from "./action/token-transfer";

export const ProposalAction = ({
  proposalContent,
}: {
  proposalContent: ProposalContent;
}) => {
  if (proposalContent.targetAddress.length != 1) {
    return (
      <ContainerSpaced>
        <Text>Multiple actions not supported</Text>
      </ContainerSpaced>
    );
  }

  let calldata = proposalContent.calldata[0].toString();

  // Parse the calldata type for dispatching
  const calldataType = ParseCalldataType(calldata);

  return (
    <ContainerSpaced>
      {calldataType === CalldataType.CoinsTransfer && (
        <CantoTransferAction
          recipient={proposalContent.targetAddress[0]}
          amount={proposalContent.amount[0]}
        />
      )}
      {calldataType === CalldataType.TokensTransfer && (
        <TokensTransferAction
          contractAddress={proposalContent.targetAddress[0]}
          calldata={calldata}
        />
      )}
      {calldataType === CalldataType.Unknown && (
        <Box>
          <Text>Unrecognized calldata</Text>
          <Text>{calldata}</Text>
        </Box>
      )}
    </ContainerSpaced>
  );
};
