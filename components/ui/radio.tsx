import { Radio } from "@chakra-ui/react";

const RadioW = ({ children, ...props }: any) => {
  return (
    <Radio
      borderColor="primary"
      _checked={{ bg: "primarydark", borderColor: "primary" }}
      {...props}
    >
      {children}
    </Radio>
  );
};

export default RadioW;
