import { Box, Divider } from "@chakra-ui/react";

const DividerW = ({ verticalPadding }: { verticalPadding?: string }) => {
  return (
    <Box
      paddingTop={verticalPadding || "20px"}
      paddingBottom={verticalPadding || "20px"}
    >
      <Divider borderColor="primary" borderWidth={2} />
    </Box>
  );
};

export default DividerW;
