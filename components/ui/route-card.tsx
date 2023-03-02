import React, {
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from 'react-icons/ai';

import {
  Box,
  Button,
  Icon,
  Image,
  Text,
  useColorMode,
} from '@chakra-ui/react';

const SIZES = {
  lg: {
    height: 12,
    walletImageSize: 7,
    icon: 5,
    fontSize: "md",
  },
  md: {
    height: 10,
    walletImageSize: 6,
    icon: 4,
    fontSize: "sm",
  },
  sm: {
    height: 7,
    walletImageSize: 5,
    icon: 3.5,
    fontSize: "sm",
  },
};

export function stringTruncateFromCenter(str: string, maxLength: number) {
  const midChar = "…"; // character to insert into the center of the result

  if (str.length <= maxLength) return str;

  // length of beginning part
  const left = Math.ceil(maxLength / 2);

  // start index of ending part
  const right = str.length - Math.floor(maxLength / 2) + 1;

  return str.substring(0, left) + midChar + str.substring(right);
}

export function handleChangeColorModeValue(
  colorMode: string,
  light: string,
  dark: string
) {
  if (colorMode === "light") return light;
  if (colorMode === "dark") return dark;
}

// TODO: Rename into LinkCard
export const RouteCard = ({
  cardText,
  route,
  walletIcon,
  isLoading,
  size = "md",
  maxDisplayLength,
  arrowLeft = false,
}: any) => {
  const [displayAddress, setDisplayAddress] = useState("");
  const { colorMode } = useColorMode();
  const defaultMaxLength = {
    lg: 14,
    md: 16,
    sm: 18,
  };

  useEffect(() => {
    if (!cardText) setDisplayAddress("card text not identified yet");
    if (cardText && maxDisplayLength)
      setDisplayAddress(stringTruncateFromCenter(cardText, maxDisplayLength));
    if (cardText && !maxDisplayLength)
      setDisplayAddress(
        stringTruncateFromCenter(
          cardText,
          defaultMaxLength[size as keyof typeof defaultMaxLength]
        )
      );
  }, [cardText]);

  return (
    <Link href={route}>
      <Button
        title={cardText}
        variant="unstyled"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius={0}
        border="2px"
        borderColor="secondary"
        w="full"
        h={SIZES[size as keyof typeof SIZES].height}
        minH="fit-content"
        pl={2}
        pr={2}
        color="primary"
        transition="all .3s ease-in-out"
        isDisabled={!cardText && true}
        isLoading={isLoading}
        _hover={{
          bg: "primarydarker",
        }}
        _focus={{
          outline: "none",
        }}
        _disabled={{
          opacity: 0.6,
          cursor: "not-allowed",
          _hover: {
            bg: "transparent",
          },
          _active: {
            outline: "none",
          },
          _focus: {
            outline: "none",
          },
        }}
      >
        {cardText && walletIcon && (
          <Box
            borderRadius="full"
            w="full"
            h="full"
            minW={SIZES[size as keyof typeof SIZES].walletImageSize}
            minH={SIZES[size as keyof typeof SIZES].walletImageSize}
            maxW={SIZES[size as keyof typeof SIZES].walletImageSize}
            maxH={SIZES[size as keyof typeof SIZES].walletImageSize}
            mr={2}
            opacity={0.85}
          >
            <Image alt={displayAddress} src={walletIcon} />
          </Box>
        )}
        <Text fontWeight="normal" letterSpacing="0.4px" color="primary">
          {displayAddress}
        </Text>
        {cardText && (
          <Icon
            as={arrowLeft ? AiOutlineArrowLeft : AiOutlineArrowRight}
            w={SIZES[size as keyof typeof SIZES].icon}
            h={SIZES[size as keyof typeof SIZES].icon}
            ml={2}
            opacity={0.9}
            color={
              cardText
                ? "secondary"
                : handleChangeColorModeValue(
                    colorMode,
                    "secondary",
                    "secondarydark"
                  )
            }
          />
        )}
      </Button>
    </Link>
  );
};
