import { HttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {

  const authLink = setContext((_, { headers }) => {
    const token = process.env.NEXT_API_KEY
    return {
      headers: {
        ...headers,
        'X-Api-Key': token,
      },
    }
  })
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      typePolicies: {
        Recording: {
          fields: {
            insights: {
              merge(existing, incoming, { mergeObjects }) {
                return mergeObjects(existing, incoming);
              },
            },
            parameters: {
              merge(existing, incoming, { mergeObjects }) {
                return mergeObjects(existing, incoming);
              },
            },
            samples: {
              merge(existing, incoming, { mergeObjects }) {
                return mergeObjects(existing, incoming);
              },
            }
          }
        }
      }
    }),
    link: authLink.concat(new HttpLink({
      uri: process.env.NEXT_GQL_API_URL,
    })),
  });
});