# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1.2.10-debian AS base
WORKDIR /app


FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
COPY apps /temp/dev/apps
RUN bun install --cwd /temp/dev --frozen-lockfile


RUN mkdir -p /temp/prod
COPY apps/backend/package.json bun.lock /temp/prod/
RUN bun install --cwd /temp/prod --omit=dev --omit=peer --omit=optional


FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run build


FROM oven/bun:1-distroless
WORKDIR /app

COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app/apps/backend/out/app.js index.js
COPY --from=prerelease /app/apps/frontend/dist frontend

ENV FRONTEND_PATH=/app/frontend
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "index.js" ]