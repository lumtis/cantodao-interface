import { Container, VStack } from "@chakra-ui/react";

const ContainerSpaced = ({ spacing, children, ...props }: any) => {
  return (
    <Container {...props}>
      <VStack spacing={spacing || 4} align="stretch">
        {children}
      </VStack>
    </Container>
  );
};

export default ContainerSpaced;
