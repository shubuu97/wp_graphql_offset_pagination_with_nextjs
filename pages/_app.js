import { ApolloProvider } from "@apollo/client";
import Router from "next/router";
import Head from "next/head";
import App from "next/app";
import NProgress from "nprogress";
import Layout from "../components/Layout";
import { GET_MENUS } from "../gql/getMenus";
import client from "../apollo/client";
import "../styles/globals.css";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", (url) => {
   NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
   static async getInitialProps({ req, Component, ctx }) {
      let pageProps = {};
      if (Component.getInitialProps) {
         pageProps = await Component.getInitialProps(ctx);
      }

      const { data, loading, networkStatus } = await client.query({
         query: GET_MENUS,
      });

      return { pageProps, menus: data?.headerMenus?.edges ?? [] };
   }

   render() {
      const { Component, pageProps, menus } = this.props;
      return (
         <>
            <Head>
               <link rel="stylesheet" type="text/css" href="/static/css/nprogress.css" />
            </Head>
            <ApolloProvider client={client}>
               <Layout menus={menus}>
                  <Component {...pageProps} menus={menus} />
               </Layout>
            </ApolloProvider>
         </>
      );
   }
}

export default MyApp;
