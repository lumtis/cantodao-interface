import { Box } from "@chakra-ui/react";

const BoxW = ({ children, ...props }: any) => {
  return (
    <Box
      border="2px"
      boxShadow="md"
      borderColor="primary"
      padding="30px"
      borderRadius="md"
      {...props}
    >
      {children}
    </Box>
  );
};

export default BoxW;
