import { Code } from "@chakra-ui/react";

const CodeW = ({ children, ...props }: any) => {
  return (
    <Code
      p="6px"
      backgroundColor="greydark"
      color="white"
      borderRadius="8px"
      {...props}
    >
      {children}
    </Code>
  );
};

export default CodeW;
