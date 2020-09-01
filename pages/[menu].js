import React from "react";
import { useRouter } from "next/router";

const Menu = ({ menus }) => {
   const router = useRouter();

   return (
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
         {router.query.menu}
      </div>
   );
};

export default Menu;
