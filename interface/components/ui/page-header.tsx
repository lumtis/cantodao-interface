import { Box, Heading, Image } from "@chakra-ui/react";

const PageHeader = ({
  title,
  imgSource,
  imgHeight,
  imgWidth,
  fontSize,
  marginBottom,
  ...props
}: any) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      mb={marginBottom || 8}
      {...props}
    >
      <Image src={imgSource} h={imgHeight || 10} w={imgWidth || 10} />
      <Heading
        as="h1"
        fontSize={fontSize || { base: "3xl", sm: "4xl", md: "5xl" }}
        fontWeight="extrabold"
        ml={4}
      >
        {title}
      </Heading>
    </Box>
  );
};

export default PageHeader;
