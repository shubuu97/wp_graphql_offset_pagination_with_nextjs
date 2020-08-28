import { ApolloProvider } from "@apollo/client";
import Router from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
import client from "../apollo/client";
import "../styles/globals.css";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", (url) => {
   NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const App = ({ Component, pageProps, data }) => {
   return (
      <>
         <Head>
            <link rel="stylesheet" type="text/css" href="/css/nprogress.css" />
         </Head>
         <ApolloProvider client={client}>
            <Component {...pageProps} />
         </ApolloProvider>
      </>
   );
};

export default App;
