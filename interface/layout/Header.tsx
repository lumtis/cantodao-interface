import { Box, Heading, Image, Link } from "@chakra-ui/react";

import { Address } from "../components/wallet/address";
import { Connect } from "../components/wallet/connect";
import links from "../config/navlinks";

// Header is a simple empty header with a gray background using Chakra UI
const Header = () => {
  // List of components for the navigation bar
  const navLinks = links.map((link) => (
    <Box p="4" display="flex" alignItems="center" key={link.key}>
      <Heading size="lg" letterSpacing={"tighter"}>
        <Link
          _hover={{
            color: "primary",
            textDecoration: "none",
          }}
          href={link.href}
        >
          {link.label}
        </Link>
      </Heading>
    </Box>
  ));

  // The header contains a string "hello" on the right side of the bar
  return (
    <Box as="header" h="20" bg="black" p="15px">
      <Box
        as="nav"
        paddingLeft="4"
        display="flex"
        justifyContent="flex-end"
        float={"left"}
      >
        <Box p="4" display="flex" alignItems="center">
          <Link href="/">
            <Image h="10" src="images/logo.png" alt="logo" />
          </Link>
        </Box>
        {navLinks}
      </Box>
      <Box
        as="nav"
        p="4"
        display="flex"
        justifyContent="flex-end"
        float={"right"}
      >
        <Box paddingX="2">
          <Address />
        </Box>
        <Box paddingX="2">
          <Connect />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
