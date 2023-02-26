import { Box } from "@chakra-ui/react";

import Footer from "./Footer";
import Header from "./Header";

// Layout component with a sidebar and a header using Chakra UI
const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <Box pt="10" backgroundColor={"dark"} minH="100vh">
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
