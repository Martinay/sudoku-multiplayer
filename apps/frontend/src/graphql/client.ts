import { createClient, fetchExchange, subscriptionExchange  } from "urql";

import { createClient as createWSClient } from 'graphql-ws';

const defaultUrl = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/graphql`;
const wsClient = createWSClient({
  url: import.meta.env.VITE_WS_URL || defaultUrl,
});

export const client = createClient({
  url: '/graphql',
  exchanges: [
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(request) {
        const input = { ...request, query: request.query || '' };
        return {
          subscribe(sink) {
            const unsubscribe = wsClient.subscribe(input, sink);
            return { unsubscribe };
          },
        };
      },
    })
  ],
})