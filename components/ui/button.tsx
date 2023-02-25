import { Button } from '@chakra-ui/react';

const ButtonW = ({ children, ...props }: any) => {
  return (
    <Button
      bg="transparent"
      color="primary"
      _hover={{
        bg: "primarydarker",
        color: "primary",
      }}
      border="4px"
      borderRadius={0}
      _active={{
        bgImage: "linear-gradient(109.6deg, primary 11.2%, primary 83.1%)",
        opacity: 0.9,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonW;
