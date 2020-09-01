import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

/**
 * Instantiate required constructor fields
 */
const cache = new InMemoryCache();
const link = createHttpLink({
   uri: process.env.NEXT_PUBLIC_MENU_ITEMS_URL,
});

const client = new ApolloClient({
   cache,
   link,
});

export default client;
