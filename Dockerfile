# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1-distroless
WORKDIR /app

COPY  apps/backend/node_modules node_modules
COPY apps/backend/out/app.js index.js
COPY apps/frontend/dist frontend

ENV FRONTEND_PATH=/app/frontend

EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "index.js" ]