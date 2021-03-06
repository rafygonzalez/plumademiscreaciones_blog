import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'


export function getStandaloneApolloClient() {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_SERVER_URL, // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch,
    }),
    cache: new InMemoryCache(),
  })
}

export const client = (initialState, ctx): ApolloClient<any> => {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_SERVER_URL, // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  })
}