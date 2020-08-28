import React from "react";
import Link from "next/link";

const Home = () => {
   return (
      <div>
         <Link href="/posts/[page_no]" as="/posts/1">
            <a>Blog Posts</a>
         </Link>
      </div>
   );
};

export default Home;
