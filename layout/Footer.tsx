import { FaGithub, FaTwitter } from "react-icons/fa";

import { Box, Icon, Link, Text } from "@chakra-ui/react";

// TODOHERE: implement regular footer
const Footer = () => {
  return (
    <Box
      as="footer"
      backgroundColor={"darker"}
      textAlign="center"
      width="100%"
      p={10}
      top="100vh"
      bottom={0}
      marginTop={20}
    >
      <Text>
        cantodao |{" "}
        <Link href="https://github.com/lumtis/cantodao">
          <Icon as={FaGithub} color={"primary"} />
        </Link>{" "}
        <Link href="https://twitter.com/cantodao_com">
          <Icon as={FaTwitter} color={"primary"} />
        </Link>
      </Text>
    </Box>
  );
};

export default Footer;
