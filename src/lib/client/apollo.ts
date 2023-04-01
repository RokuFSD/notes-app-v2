import { setContext } from "@apollo/client/link/context";
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from "@apollo/client";

const authLink = setContext((_, { headers }) => {
  // TODO: Add firebase auth token
  return {
    headers
  };
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache()
});

export default client;