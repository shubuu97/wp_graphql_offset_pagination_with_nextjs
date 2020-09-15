import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../gql/getPosts";
import client from "../apollo/client";

const PER_PAGE = 10;

//? GET_POSTS query variables
const variables = {
  first: PER_PAGE,
  after: null,
};

//? Gets called on load more, merges the old results with the new one
const updateQuery = (previousResult, { fetchMoreResult }) => {
  return {
    ...fetchMoreResult,
    posts: {
      ...(fetchMoreResult?.posts ?? {}),
      nodes: [
        ...(previousResult?.posts?.nodes ?? []),
        ...(fetchMoreResult?.posts?.nodes ?? []),
      ],
    },
  };
};

const Home = ({ dataServer }) => {
  const { data: dataClient, error, loading, fetchMore } = useQuery(GET_POSTS, {
    variables,
    ssr: false,
  });

  //? Using getServerSideProps data (dataServer) for the initial Load otherwise using data from useQuery(dataClient)
  let postsData = typeof window === "undefined" ? dataServer : dataClient;

  const { edges, nodes, pageInfo } = postsData?.posts ?? {};
  const { hasNextPage } = pageInfo || {};

  return (
    <div style={{ marginLeft: "50px" }}>
      <ul>
        {(nodes || []).map((post, index) => {
          const { id, title } = post || {};
          return (
            <li style={{ padding: "20px" }} key={id}>
              {title}
            </li>
          );
        })}
      </ul>

      {hasNextPage && (
        <button
          onClick={() => {
            fetchMore({
              variables: {
                ...variables,
                after: edges?.[edges.length - 1]?.cursor ?? "",
              },
              updateQuery,
            });
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_POSTS,
    variables,
  });
  return {
    props: { dataServer: data },
  };
}
