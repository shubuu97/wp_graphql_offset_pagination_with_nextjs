import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import client from "../../apollo/client";
import { GET_POSTS, GET_TOTAL_POSTS_COUNT } from "../../gql/getPosts";
import { PER_PAGE_FIRST, PER_PAGE_REST } from "../../utils/constants";
import updateQuery from "../../utils/updateQuery";

const variables = {
  first: PER_PAGE_FIRST,
  after: null,
};

const Reviews = ({ dataServer, pagesCount }) => {
  const router = useRouter();

  const { data: dataClient, loading, fetchMore } = useQuery(GET_POSTS, {
    variables,
    ssr: false,
  });

  //? Using getServerSideProps data (dataServer) for the initial load otherwise using data from useQuery(dataClient)
  let postsData = typeof window === "undefined" ? dataServer : dataClient;

  const { edges, nodes, pageInfo } = postsData?.posts ?? {};
  const { hasNextPage } = pageInfo || {};

  const pageNo = router?.query?.page_no ?? 1;

  const handleLoadMore = () => {
    const lastItemCursor = edges?.[(edges || []).length - 1]?.cursor ?? "";
    fetchMore({
      variables: {
        first: PER_PAGE_REST,
        after: lastItemCursor,
      },
      updateQuery,
    });
  };

  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
      </Head>
      <div className="container">
        {loading
          ? "Loading..."
          : (nodes || []).map((post) => {
              const { id, title } = post || {};
              return (
                <div className="post" key={id}>
                  {title}
                </div>
              );
            })}
        {hasNextPage && (
          <button className="load_more_btn" onClick={handleLoadMore}>
            Load More
          </button>
        )}

        {/* need to hide this pagination  */}

        {/* <div>
          {new Array(pagesCount).fill().map((_, index) => {
            return (
              <Link
                key={index + _}
                href="/reviews/page/[page_no]"
                as={`/reviews/page/${index + 1}`}
              >
                <a
                  className={
                    pageNo == index + 1 ? "page_no selected" : "page_no"
                  }
                >
                  {index + 1}
                </a>
              </Link>
            );
          })}
        </div> */}
      </div>
    </>
  );
};

export default Reviews;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_POSTS,
    variables,
  });

  const { data: totalPosts } = await client.query({
    query: GET_TOTAL_POSTS_COUNT,
  });

  const totalPostsCount =
    totalPosts?.posts?.pageInfo?.offsetPagination?.total ?? 0;

  //* since the first page posts and other page posts will be different, we subtract the no of posts we'll show n first page and then divide the result with the no of posts we'll show on other pages and then will add 1 for the first page that we subtracted.
  const pagesCount = Math.ceil(
    (totalPostsCount - PER_PAGE_FIRST) / PER_PAGE_REST + 1
  );

  return {
    props: { dataServer: data, pagesCount },
  };
}
