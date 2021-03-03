import fetch from 'isomorphic-unfetch'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'

let accessToken: string | null = null

const requestAccessToken = async () => {
  if (accessToken) return
  const res = await fetch(`${process.env.APP_HOST}/api/session`)
  if (res.ok) {
    const json = await res.json()
    accessToken = json.accessToken
  } else {
    accessToken = 'public'
  }
}

const createHttpLink = (headers: any) => {
  const httpLink = new HttpLink({
    uri: process.env.SERVER_URL,
    credentials: 'include',
    headers, // auth token is fetched on the server side
    fetch,
  })
  return httpLink;
}
const createWSLink = () => {
  return new WebSocketLink(
    new SubscriptionClient(process.env.WS_SERVER_URL || 'ws://localhost:1337/graphql', {
      lazy: true,
      reconnect: true,
      connectionParams: async () => {
        await requestAccessToken() // happens on the client
        return {
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        }
      },
    })
  )
}
export default function createApolloClient(initialState: NormalizedCacheObject, headers: any) {
  const ssrMode = typeof window === 'undefined'
  let link
  if (ssrMode) {
    link = createHttpLink(headers) // executed on server
  } else {
    link = createWSLink() // executed on client
  }
  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache().restore(initialState),
  })
}