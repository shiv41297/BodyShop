import * as React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { store } from "../state/store/store";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Footer from "../components/footers";
import Headers from "../components/headers";

import createEmotionCache from "../../utility/createEmotionCache";
import "../../styles/globals.css";
import theme from "../constants/theme";
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(theme);
const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <>
      
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Provider store={store}>
            <Headers />
            <Component {...pageProps} />
            <Footer />
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default MyApp;
