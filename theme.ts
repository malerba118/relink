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
  shadows: {
    outline: "0 0 0 3px var(--chakra-colors-pink-300)",
  },
  components: {
    Input: {
      sizes: {
        lg: {
          field: {
            fontSize: "md",
          },
        },
      },
      defaultProps: {
        focusBorderColor: "pink.300",
      },
    },
    Textarea: {
      sizes: {
        lg: {
          fontSize: "md",
        },
      },
      defaultProps: {
        focusBorderColor: "pink.300",
      },
    },
    Tooltip: {
      baseStyle: {
        bgColor: "gray.600",
        color: "gray.50",
      },
    },
    Button: {
      defaultProps: {
        focusBorderColor: "pink.300",
      },
      baseStyle: {
        bgColor: "pink.200",
        color: "pink.900",
      },
      variants: {
        solid: ({ colorScheme }: any) => ({
          bg:
            colorScheme === "whiteAlpha"
              ? `${colorScheme}.200`
              : `${colorScheme}.300`,
          color: `${colorScheme}.900`,
          _hover: {
            bg:
              colorScheme === "whiteAlpha"
                ? `${colorScheme}.300`
                : `${colorScheme}.400`,
          },
        }),
        ghost: ({ colorScheme }: any) => ({
          color: `${colorScheme}.300`,
        }),
      },
    },
    Spinner: {
      // baseStyle: {
      //   color: "pink.300",
      // },
    },
  },
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
    pink: {
      50: "#fff1f2",
      100: "#ffe4e6",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
      700: "#be123c",
      800: "#9f1239",
      900: "#881337",
    },
  },
});

export default theme;
