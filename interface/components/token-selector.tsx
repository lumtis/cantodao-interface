import { useState } from "react";

import { Box, Text } from "@chakra-ui/react";

import { GetNoteAddress } from "../config/addresses";
import { NullAddress } from "../types/evm";
import ContainerSpaced from "./ui/container-spaced";
import Input from "./ui/input";
import Radio from "./ui/radio";

// TokenInfo is a type that contains and address of a token
type TokenInfo = {
  name: string;
  address: `0x${string}`;
};

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
  setToken: (tokenAddress: string) => void;
}) => {
  const [selected, setSelected] = useState(NoteName);
  const [manualInput, setmManualInput] = useState(NullAddress);

  const allTokens = [
    {
      name: NoteName,
      address: GetNoteAddress(),
    },
  ].concat(tokens);

  const TokenButton = ({ token }: { token: TokenInfo }) => {
    return (
      <Radio
        key={token.name}
        isChecked={selected === token.name}
        onChange={() => {
          setSelected(token.name);
          setToken(token.address);
        }}
      >
        <Text>{token.name}</Text>
      </Radio>
    );
  };

  return (
    <ContainerSpaced>
      {allTokens.map((token) => {
        return <TokenButton token={token} />;
      })}
      <Box h="50px" display="flex" flexDirection="row" alignItems="center">
        <Radio
          key={Manual}
          isChecked={selected === Manual}
          onChange={() => {
            setSelected(Manual);
            setToken(manualInput);
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
            onChange={(event: any) => setmManualInput(event.target.value)}
          />
        )}
      </Box>
    </ContainerSpaced>
  );
};
