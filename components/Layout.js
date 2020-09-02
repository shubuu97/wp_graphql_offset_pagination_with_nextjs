import React from "react";
import Link from "next/link";

const PATH_TO_REPLACE = "/wordpress_woo";

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
               <Link
                  key={menus[0]?.node?.id ?? ""}
                  href="/[...slug]"
                  as={menus[0].node.path.replace(PATH_TO_REPLACE, "")}
               >
                  <a
                     style={{
                        fontSize: "18px",
                        color: "blue",
                        textDecoration: "none",
                        marginRight: "10px",
                     }}
                  >
                     {menus[0].node.label}
                  </a>
               </Link>
               <Link
                  key={menus[1]?.node?.id ?? ""}
                  href="/[...slug]"
                  as={menus[1].node.path.replace(PATH_TO_REPLACE, "")}
               >
                  <a
                     style={{
                        fontSize: "18px",
                        color: "blue",
                        textDecoration: "none",
                        marginRight: "10px",
                     }}
                  >
                     {menus[1].node.label}
                  </a>
               </Link>
               <Link
                  key={menus[2]?.node?.id ?? ""}
                  href="/[...slug]"
                  as={menus[2].node.path.replace(PATH_TO_REPLACE, "")}
               >
                  <a
                     style={{
                        fontSize: "18px",
                        color: "blue",
                        textDecoration: "none",
                        marginRight: "10px",
                     }}
                  >
                     {menus[2].node.label}
                  </a>
               </Link>
               <Link
                  key={menus[3]?.node?.id ?? ""}
                  href="/[...slug]"
                  as={menus[3].node.path.replace(PATH_TO_REPLACE, "")}
               >
                  <a
                     style={{
                        fontSize: "18px",
                        color: "blue",
                        textDecoration: "none",
                        marginRight: "10px",
                     }}
                  >
                     {menus[3].node.label}
                  </a>
               </Link>
               <Link
                  key={menus[4]?.node?.id ?? ""}
                  href="/[...slug]"
                  as={menus[4].node.path.replace(PATH_TO_REPLACE, "")}
               >
                  <a
                     style={{
                        fontSize: "18px",
                        color: "blue",
                        textDecoration: "none",
                        marginRight: "10px",
                     }}
                  >
                     {menus[4].node.label}
                  </a>
               </Link>
               <Link
                  key={menus[5]?.node?.id ?? ""}
                  href="/category/[...slug]"
                  as={menus[5].node.path.replace(PATH_TO_REPLACE, "")}
               >
                  <a
                     style={{
                        fontSize: "18px",
                        color: "blue",
                        textDecoration: "none",
                        marginRight: "10px",
                     }}
                  >
                     {menus[5].node.label}
                  </a>
               </Link>
            </div>
         </header>
         {children}
      </div>
   );
};

export default Layout;
