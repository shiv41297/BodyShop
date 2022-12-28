import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
// import { CssBaseline, ThemeProvider } from "@material-ui/core";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../config/createEmotionCache";
import theme from "../config/theme";
import { wrapper } from "../store/store";
import { Provider } from "react-redux";
import Headers from "../component/components/headers";
import Footer from "../component/components/footers";
import "../styles/globals.css";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  ...rest
}: MyAppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Headers />
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <Component {...props.pageProps} />
          <Footer />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
    
    
  );
}
export default MyApp;
