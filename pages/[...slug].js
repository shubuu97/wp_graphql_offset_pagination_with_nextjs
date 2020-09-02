import React from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { GET_MENUS } from "../gql/getMenus";
import client from "../apollo/client";

const Menu = ({ menus }) => {
   const router = useRouter();
   const slug = router.query.slug;
   return (
      <Layout menus={menus}>
         <div
            style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               width: "100%",
               height: "80vh",
               fontSize: "32px",
               fontWeight: "bold",
            }}
         >
            {router.query.slug}
         </div>
      </Layout>
   );
};

export default Menu;

export async function getServerSideProps({ params }) {
   const { data, loading, networkStatus } = await client.query({
      query: GET_MENUS,
   });
   return {
      props: {
         menus: data?.headerMenus?.edges ?? [],
      },
   };
}
