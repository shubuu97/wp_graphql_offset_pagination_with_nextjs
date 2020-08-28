import React from "react";
import Link from "next/link";

const Home = () => {
   return (
      <div
         style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
         }}
      >
         <Link href="/posts/[page_no]" as="/posts/1">
            <a style={{ fontSize: "32px", color: "blue", textDecoration: "none" }}>Blog Posts</a>
         </Link>
      </div>
   );
};

export default Home;
