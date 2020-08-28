import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

/**
 * Instantiate required constructor fields
 */
const cache = new InMemoryCache();
const link = createHttpLink({
   uri: "http://localhost:8888/blog_posts/graphql",
});

const client = new ApolloClient({
   cache,
   link,
});

export default client;
