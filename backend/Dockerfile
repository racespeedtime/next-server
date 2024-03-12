# builder

FROM node:alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY . .
COPY .env ./dist

RUN pnpm install --frozen-lockfile
RUN pnpm build

# final

FROM node:alpine

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/package.json /app/package-lock.yaml ./
RUN pnpm install --frozen-lockfile --production
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main"]
