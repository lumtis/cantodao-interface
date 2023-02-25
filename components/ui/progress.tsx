import { Progress } from "@chakra-ui/react";

const ProgressW = ({ value, reached, ...props }: any) => {
  const colorScheme = reached ? "purple" : "pink";
  return (
    <Progress
      borderColor="primary"
      borderWidth="4px"
      colorScheme={colorScheme}
      bg="dark"
      value={value}
      height="20px"
      {...props}
    />
  );
};

export default ProgressW;
