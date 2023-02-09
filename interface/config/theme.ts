import { extendTheme } from "@chakra-ui/react";

export const defaultThemeObject = {
  fonts: {
    body: "Inter, system-ui, sans-serif",
    heading: "VT323, sans-serif",
  },
  colors: {
    primary: "#C724B1",
    secondary: "#71DBD4",
    primarydark: "#642F6C",
    secondarydark: "#58A7AF",
    grey: "#B3B0C4",
    greydark: "#3A3A59",
  },
  breakPoints: {
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
