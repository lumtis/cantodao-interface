import { Box, Text } from "@chakra-ui/react";

import Code from "./code";

const Param = ({ name, value, ...props }: any) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center" {...props}>
      <Text {...props}>{name}:</Text>
      <Code ml="auto">{value}</Code>
    </Box>
  );
};

export default Param;
