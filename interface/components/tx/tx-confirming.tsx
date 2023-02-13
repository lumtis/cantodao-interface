import { Spinner, Text } from "@chakra-ui/react";

export const TxConfirming = () => {
  return (
    <Text>
      Sending tx... <Spinner />
    </Text>
  );
};
