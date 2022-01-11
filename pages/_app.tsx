import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";
import { supabase } from "@/client/api/supabase";
import theme from "../theme";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "react-query";
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
      main: pink[200],
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
