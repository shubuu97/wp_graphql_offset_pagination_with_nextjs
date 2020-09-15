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

export const GET_PAGINATED_POSTS = gql`
  query getPaginatedPosts($perPage: Int, $offset: Int) {
    posts(where: { offsetPagination: { size: $perPage, offset: $offset } }) {
      pageInfo {
        offsetPagination {
          total
        }
      }
      nodes {
        title
      }
    }
  }
`;

export const GET_TOTAL_POSTS_COUNT = gql`
  query getTotalPostsCount {
    posts {
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`;
