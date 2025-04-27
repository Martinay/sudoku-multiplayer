import { createClient, fetchExchange } from "urql";

export const client = createClient({
  url: 'http://localhost:3000/graphql',
  fetchSubscriptions: true,
  exchanges: [
    fetchExchange 
  ],
})