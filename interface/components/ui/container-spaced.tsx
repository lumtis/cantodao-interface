import { Container, VStack } from "@chakra-ui/react";

const ContainerSpaced = ({ children, ...props }: any) => {
  return (
    <Container>
      <VStack spacing={4} align="stretch">
        {children}
      </VStack>
    </Container>
  );
};

export default ContainerSpaced;
