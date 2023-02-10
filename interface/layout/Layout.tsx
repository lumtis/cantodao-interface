import { Box } from "@chakra-ui/react";

import Footer from "./Footer";
import Header from "./Header";

// Layout component with a sidebar and a header using Chakra UI
const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <Box pt="10" backgroundColor={"black"}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
