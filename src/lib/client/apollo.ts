import { setContext } from "@apollo/client/link/context";
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from "@apollo/client";
import { auth } from "../firebase/init";

const authLink = setContext(async (_, { headers }) => {
  const token = await auth.currentUser?.getIdToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
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