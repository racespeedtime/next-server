FROM node:alpine

WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm build

ENV NODE_ENV=production

EXPOSE 7777

ENTRYPOINT ./omp-server
