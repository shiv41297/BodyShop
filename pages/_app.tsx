import * as React from "react";
import Head from "next/head";
import { Backdrop } from "@mui/material";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { StylesProvider, createGenerateClassName } from "@mui/styles";
import { useRouter } from "next/router";
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
import { Box } from "@mui/material";
import MediaFooter from "../component/components/footers/mediaFooter";
import Addvertisement from "../component/components/addvertisementCard";

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
  const [globalLoader, setGlobalLoader] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    router.events.on("routeChangeStart", () => setGlobalLoader(true));
    router.events.on("routeChangeComplete", () => setGlobalLoader(false));
    router.events.on("routeChangeError", () => setGlobalLoader(false));
  }, []);

  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Provider store={store}>
        {globalLoader ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={globalLoader}
          >
            <CircularProgress
              sx={{ display: "flex", justifyContent: "center" }}
            />
          </Backdrop>
        ) : (
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
        )}
      </Provider>
    </CacheProvider>
  );
}
export default MyApp;
