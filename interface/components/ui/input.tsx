import { Input } from "@chakra-ui/react";

const InputW = ({ children, ...props }: any) => {
  return (
    <Input
      borderRadius={0}
      w="fit-content"
      ml="20px"
      borderColor="primary"
      borderWidth={2}
      textDecoration="none"
      fontSize="20px"
      _hover={{
        borderColor: "primarydark",
      }}
      _focus={{
        borderColor: "primarydark",
      }}
      _active={{
        borderColor: "primarydark",
      }}
      _selected={{
        borderColor: "primarydark",
      }}
      _pressed={{
        borderColor: "primarydark",
      }}
      {...props}
    >
      {children}
    </Input>
  );
};

export default InputW;
