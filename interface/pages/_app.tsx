import "../styles/globals.css";
import "@fontsource/vt323/400.css";

import { getDefaultProvider } from "ethers";
import type { AppProps } from "next/app";
import { createClient, WagmiConfig } from "wagmi";

import { ChakraProvider } from "@chakra-ui/react";

import { defaultTheme } from "../config/theme";

const App = ({ Component, pageProps }: AppProps) => {
  // EVM client
  const client = createClient({
    autoConnect: true,
    provider: getDefaultProvider(),
  });

  return (
    <ChakraProvider theme={defaultTheme}>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </ChakraProvider>
  );
};

export default App;
