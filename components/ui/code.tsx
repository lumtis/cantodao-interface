import { Text } from "@chakra-ui/react";

const CodeW = ({ children, ...props }: any) => {
  return (
    <Text p="6px" {...props}>
      {children}
    </Text>
  );
};

export default CodeW;

// TODO: Decide if we should use the actual code version:
// const CodeW = ({ children, ...props }: any) => {
//   return (
//     <Code
//       p="6px"
//       backgroundColor="greydark"
//       color="white"
//       borderRadius="8px"
//       {...props}
//     >
//       {children}
//     </Code>
//   );
// };
