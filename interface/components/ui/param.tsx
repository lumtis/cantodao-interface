import { Text } from "@chakra-ui/react";

import Code from "./code";

const Param = ({ children, name, value, ...props }: any) => {
  return (
    <Text {...props}>
      {name}:
      <Code textAlign="right" float="right">
        {value}
      </Code>
      {children}
    </Text>
  );
};

export default Param;
