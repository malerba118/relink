// 1. import `extendTheme` function
import { extendTheme, theme as defaultTheme } from "@chakra-ui/react";
import "@fontsource/montserrat";

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
  },
  config,
  colors: {
    gray: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
  },
});

export default theme;
