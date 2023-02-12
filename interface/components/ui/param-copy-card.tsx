import { Box, Text } from "@chakra-ui/react";

import { CopyCard } from "./copy-card";

const ParamCopyCard = ({ children, name, value, ...props }: any) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="flex-end" {...props}>
      <Text mr="20px">{name}: </Text>
      <CopyCard address={value} />
      {children}
    </Box>
  );
};

export default ParamCopyCard;
