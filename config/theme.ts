import { extendTheme } from "@chakra-ui/react";

export const defaultThemeObject = {
  components: {
    Text: {
      baseStyle: {
        fontSize: "22px",
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: "dark",
          borderRadius: 0,
        },
        header: {
          fontSize: "40px",
        },
        body: {
          fontSize: "22px",
        },
      },
    },
  },
  fonts: {
    body: "VT323, sans-serif",
    heading: "VT323, sans-serif",
  },
  colors: {
    dark: "#17141c",
    darker: "#131019",
    primary: "#a692b0",
    secondary: "#a692b0",
    primarydark: "#766280",
    secondarydark: "#766280",
    primarydarker: "#564260",
    primarydarkest: "#362240",
    grey: "#B3B0C4",
    greydark: "#4A3A59",
  },
  styles: {
    global: {
      body: {
        color: "primary",
        bg: "dark",
      },
    },
  },
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
  shadows: {
    largeSoft: "rgb(199, 36, 177) 0px 2px 10px 6px;",
  },
};

export const defaultTheme = extendTheme(defaultThemeObject);
