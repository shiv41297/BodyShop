import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../config/createEmotionCache";
import theme from "../config/theme";
import { wrapper } from "../store/store";
import { Provider } from "react-redux";
import Headers from "../component/components/headers";
import Footer from "../component/components/footers";
import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/globals.css";

import { StylesProvider, createGenerateClassName } from "@mui/styles";
import { Box } from "@mui/material";
import MediaFooter from "../component/components/footers/mediaFooter";
import Addvertisement from "../component/components/addvertisementCard";
import Script from "next/script";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const generateClassName = createGenerateClassName({
  productionPrefix: "c",
});

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  ...rest
}: MyAppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const ZENDESK_KEY = `${process.env.NEXT_PUBLIC_ZENDESK_ID}`;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Script
        id="ze-snippet"
        src={`https://static.zdassets.com/ekr/snippet.js?key=${ZENDESK_KEY}`}
        strategy="afterInteractive"
        onLoad={() => {
          if (navigator.onLine) {
            document.onreadystatechange = function () {
              if (document.readyState == "complete") {
                var user = {};
                if (localStorage.getItem("guestUser") !== "true") {
                  user = {
                    name: localStorage.getItem("fullName"),
                    email: localStorage.getItem("email"),
                    phone: localStorage.getItem("mobileNo"),
                  };
                }
                //@ts-ignore
                zE("webWidget", "identify", user);
                if (localStorage.getItem("underMaintenance") === "1") {
                  //@ts-ignore
                  zE && zE.hide();
                }
              }
            };
          }
        }}
      />

      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <StylesProvider generateClassName={generateClassName}>
            <Headers />
            {/* <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Addvertisement key="promotional_banner" />
            </Box>  */}

            <Box sx={{ marginTop: "130px" }}>
              <Component {...props.pageProps} />
            </Box>

            <MediaFooter />
            <Footer />
          </StylesProvider>
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}
export default MyApp;
