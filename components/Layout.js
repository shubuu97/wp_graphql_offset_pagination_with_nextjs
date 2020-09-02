import React from "react";
import Link from "next/link";

const Layout = ({ menus, children }) => {
   return (
      <div>
         <header>
            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "50px",
               }}
            >
               {(menus || []).map((menu) => {
                  const path = menu.node.path.replace("/wordpress_woo", "");
                  return (
                     <Link key={menu?.node?.id ?? ""} href="[...slug]" as={path}>
                        <a
                           style={{
                              fontSize: "18px",
                              color: "blue",
                              textDecoration: "none",
                              marginRight: "10px",
                           }}
                        >
                           {menu.node.label}
                        </a>
                     </Link>
                  );
               })}
            </div>
         </header>
         {children}
      </div>
   );
};

export default Layout;
