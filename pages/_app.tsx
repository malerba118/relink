import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";
import { supabase } from "@/client/api/supabase";
import theme from "../theme";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

const muiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: purple[200],
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <ThemeProvider theme={muiTheme}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ThemeProvider>
    </Auth.UserContextProvider>
  );
}

export default MyApp;
