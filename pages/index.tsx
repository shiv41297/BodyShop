import Head from "next/head";
import Home from "../component/components/pagesComponents/home";
import { getHomeData } from "../store/home/action";
import { wrapper } from "../store/store";

export default function Index() {
 
  return (
    <>
      <Head>
        <title>Cruelty-Free & Beauty Products | The Body Shop</title>
        <meta name="description" content="Buy Cruelty Free Beauty product from The Body Shop India." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Home  />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  //@ts-ignore-
  async ({ req, res }) => {
    await store.dispatch(getHomeData());
    return { props: {
      
    } };
  }
);
