import { gql } from "@apollo/client";

export const GET_POSTS = gql`
   query getPosts($perPage: Int, $offset: Int) {
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

export const GET_TOTAL_COUNT = gql`
   query getTotalCount {
      posts {
         pageInfo {
            offsetPagination {
               total
            }
         }
      }
   }
`;
