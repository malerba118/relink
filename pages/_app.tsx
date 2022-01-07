import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";
import { supabase } from "@/client/api/supabase";
import theme from "../theme";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={muiTheme}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Auth.UserContextProvider>
  );
}

export default MyApp;
