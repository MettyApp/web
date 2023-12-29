import { HttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { getSession } from './session';

export const { getClient } = registerApolloClient(() => {

  const authLink = setContext(async (_, { headers }) => {
    if (process.env.ENFORCE_AUTHZ === 'no') {
      return {
        headers: {
          ...headers,
          'X-Api-Key': process.env.NEXT_API_KEY,
        },
      }
    }
    const session = await getSession();
    if (session === undefined) {
      throw new Error("unauthorized");
    }
    return {
      headers: {
        ...headers,
        'Authorization': `Bearer ${session.accessToken}`,
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