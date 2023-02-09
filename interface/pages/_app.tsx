import "../styles/globals.css";
import "@fontsource/vt323/400.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { defaultTheme } from "../config/theme";

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={defaultTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default CreateCosmosApp;
