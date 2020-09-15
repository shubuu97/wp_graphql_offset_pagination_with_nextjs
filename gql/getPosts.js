import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query getPosts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        id
        title
      }
      edges {
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
