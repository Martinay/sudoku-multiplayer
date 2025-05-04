import { createSchema, createYoga } from 'graphql-yoga';
import { resolvers } from './schema/resolvers.generated';
import { typeDefs } from './schema/typeDefs.generated';
import { join } from 'path';

console.log(`Running bun version ${Bun.version}`);
console.log(`Running environment: ${Bun.env.NODE_ENV}`);

const yoga = createYoga({ schema: createSchema({ typeDefs, resolvers }) });

const frontendDistPath = Bun.env.FRONTEND_DIRECTORY;
console.log(`Serving static files from: ${frontendDistPath}`);
if (!frontendDistPath) {
  throw new Error('FRONTEND_DIRECTORY environment variable is not set');
}

const server = Bun.serve({
  async fetch(req) {
    const url = new URL(req.url);

    if (
      url.pathname === yoga.graphqlEndpoint ||
      url.pathname.startsWith('/graphql')
    ) {
      return yoga(req);
    }

    let requestedPath = url.pathname;
    if (requestedPath === '/') {
      requestedPath = '/index.html'; // Serve index.html for the root path
    }

    // Construct the full path, decoding URI components
    const filePath = join(frontendDistPath, decodeURIComponent(requestedPath));

    // Security check: Ensure the resolved path is still within the frontendDistPath
    if (!filePath.startsWith(frontendDistPath)) {
      console.warn(`Blocked request for path outside dist: ${requestedPath}`);
      return new Response('Forbidden', { status: 403 });
    }

    try {
      const file = Bun.file(filePath);
      if (await file.exists()) {
        // Serve the existing file
        // Bun automatically sets the Content-Type header
        return new Response(file);
      }

      // Fallback for SPAs: If the file doesn't exist, serve index.html
      // This allows client-side routing to handle the path
      const indexFile = Bun.file(join(frontendDistPath, 'index.html'));
      if (await indexFile.exists()) {
        return new Response(indexFile);
      }
    } catch (error) {
      console.error(`Error serving static file ${filePath}:`, error);
      return new Response('Internal Server Error', { status: 500 });
    }

    // If no file is found (including index.html fallback), return 404
    return new Response('Not Found', { status: 404 });
  },
  error(error) {
    console.error('Bun server error:', error);
    return new Response('Uh oh!!', { status: 500 });
  },
});

console.info(
  `GraphQL API running on ${new URL(
    yoga.graphqlEndpoint,
    `http://${server.hostname}:${server.port}`
  )}`
);
console.info(
  `Serving static files from http://${server.hostname}:${server.port}`
);
