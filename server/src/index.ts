import { createSchema, createYoga } from 'graphql-yoga';
import { resolvers } from './schema/resolvers.generated';
import { typeDefs } from './schema/typeDefs.generated';

console.log(`Running bun version ${Bun.version}`);

const yoga = createYoga({ schema: createSchema({ typeDefs, resolvers }) });

const server = Bun.serve({
  fetch: yoga,
});

console.info(
  `Server is running on ${new URL(
    yoga.graphqlEndpoint,
    `http://${server.hostname}:${server.port}`
  )}`
);
