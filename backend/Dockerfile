# base
FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY . /app
COPY .env /app/dist

WORKDIR /app

# prod-deps
FROM base AS prod-deps

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# build
FROM base AS build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build

# run
FROM base

ENV NODE_ENV=production

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

EXPOSE 3000

CMD ["node", "dist/main"]
