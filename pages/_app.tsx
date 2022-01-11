import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";
import { supabase } from "@/client/api/supabase";
import theme from "../theme";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import * as api from "@/client/api";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => {
      if (error?.message === "JWT expired") {
        api.auth.signOut().finally(() => window.location.reload());
      }
    },
  }),
});

const muiTheme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#fda4af",
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
