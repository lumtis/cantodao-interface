import "../styles/globals.css";
import "@fontsource/vt323/400.css";

import type { AppProps } from "next/app";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { localhost } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

import { ChakraProvider } from "@chakra-ui/react";

import { CantoTestnet } from "../config/chain";
import { defaultTheme } from "../config/theme";

const App = ({ Component, pageProps }: AppProps) => {
  // Use localhost
  // TODO: Implement mainnet support
  const { chains, provider } = configureChains(
    [localhost, CantoTestnet],
    [publicProvider()]
  );

  const client = createClient({
    autoConnect: true,
    connectors: [new InjectedConnector({ chains })],
    provider,
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
