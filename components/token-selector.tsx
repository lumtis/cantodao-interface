import { useEffect, useState } from "react";

import { Box, Text } from "@chakra-ui/react";

import useQueryTokenInfo from "../hooks/queries/useTokenInfo";
import { TokenInfo } from "../types/token";
import ContainerSpaced from "./ui/container-spaced";
import Input from "./ui/input";
import Radio from "./ui/radio";

const NoteName = "Canto note";
const Manual = "manual";

// TokenSelector shows a radio button list to select an ERC20 token
// Note and manual input is present by default in the list
// Additional tokens can be pased
export const TokenSelector = ({
  tokens,
  setToken,
}: {
  tokens: TokenInfo[];
  setToken: (token: TokenInfo) => void;
}) => {
  const [selected, setSelected] = useState(NoteName);
  const [manualInput, setManualInput] = useState("");

  const { tokenInfo, error, isLoading } = useQueryTokenInfo(manualInput);

  useEffect(() => {
    if (selected === Manual && !isLoading && !error && tokenInfo) {
      setToken(tokenInfo);
    }
  }, [manualInput]);

  // Radio button for token selection
  const TokenButton = ({ token }: { token: TokenInfo }) => {
    return (
      <>
        {token && token.name && (
          <Radio
            key={token.name}
            isChecked={selected === token.name}
            onChange={() => {
              setSelected(token.name || "");
              setToken(token);
            }}
          >
            <Text>{token.name}</Text>
          </Radio>
        )}
      </>
    );
  };

  return (
    <ContainerSpaced>
      {tokens.map((token, i) => {
        return <TokenButton key={i} token={token} />;
      })}
      <Box h="50px" display="flex" flexDirection="row" alignItems="center">
        <Radio
          key={Manual}
          isChecked={selected === Manual}
          onChange={() => {
            setSelected(Manual);
            if (manualInput && !isLoading && !error && tokenInfo) {
              setToken(tokenInfo);
            }
          }}
        >
          <Text>Manual:</Text>
        </Radio>
        {selected === Manual && (
          <Input
            w="170px"
            ml="auto"
            id="manualinput"
            name="manualinput"
            value={manualInput}
            onChange={(event: any) => setManualInput(event.target.value)}
          />
        )}
      </Box>
    </ContainerSpaced>
  );
};
