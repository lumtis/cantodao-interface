import { Box } from "@chakra-ui/react";

const BoxW = ({ children, ...props }: any) => {
  return (
    <Box
      border="4px"
      boxShadow="md"
      borderColor="primary"
      padding="30px"
      {...props}
    >
      {children}
    </Box>
  );
};

export default BoxW;
