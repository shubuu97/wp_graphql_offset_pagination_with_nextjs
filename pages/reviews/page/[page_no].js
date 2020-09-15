import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import client from "../../../apollo/client";
import {
  GET_PAGINATED_POSTS,
  GET_TOTAL_POSTS_COUNT,
} from "../../../gql/getPosts";
import { PER_PAGE_FIRST, PER_PAGE_REST } from "../../../utils/constants";

const Home = ({ data, loading }) => {
  const router = useRouter();

  const { nodes, pageInfo } = data ?? {};
  const totalPostsCount = pageInfo?.offsetPagination?.total ?? 0;

  const pagesCount = Math.ceil(
    (totalPostsCount - PER_PAGE_FIRST) / PER_PAGE_REST + 1
  );
  const pageNo = router?.query?.page_no ?? 1;

  //? Redirecting to /reviews if we are on page 1
  if (typeof window !== "undefined" && pageNo == 1) {
    router.push("/reviews");
  }

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
        <div>
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
        </div>
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps({ params }) {
  const { page_no } = params || {};

  let offset = 0;
  if (page_no == "1") offset = 0;
  else if (page_no === "2") offset = PER_PAGE_FIRST;
  else {
    offset = PER_PAGE_FIRST + (Number(page_no) - 2) * PER_PAGE_REST;
  }

  const variables = {
    perPage: page_no === "1" ? PER_PAGE_FIRST : PER_PAGE_REST,
    offset,
  };

  const { data, loading, networkStatus } = await client.query({
    query: GET_PAGINATED_POSTS,
    variables,
  });

  return {
    props: {
      data: data?.posts ?? {},
      loading,
      networkStatus,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_TOTAL_POSTS_COUNT,
  });
  const totalPostsCount = data?.posts?.pageInfo?.offsetPagination?.total ?? 0;

  //* since the first page posts and other page posts will be different, we subtract the no of posts we'll show n first page and then divide the result with the no of posts we'll show on other pages and then will add 1 for the first page that we subtracted.
  const pagesCount = Math.ceil(
    (totalPostsCount - PER_PAGE_FIRST) / PER_PAGE_REST + 1
  );

  const paths = new Array(pagesCount).fill("").map((_, index) => ({
    params: {
      page_no: (index + 1).toString(),
    },
  }));
  return {
    paths: [...paths],
    fallback: false,
  };
}
