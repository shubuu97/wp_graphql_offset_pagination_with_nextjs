import React from "react";
import Link from "next/link";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
      </Head>
      <div className="home_container">
        <Link href="/reviews">
          <a className="home_link">Reviews</a>
        </Link>
      </div>
    </>
  );
};

export default Home;
