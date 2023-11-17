FROM node:18-alpine as builder

RUN npm install -g pnpm

WORKDIR /my-space
COPY package.json pnpm-lock.yaml ./
RUN pnpm install


COPY . .
RUN pnpm build:dev
RUN pnpm prune --prod

FROM node:18-alpine as runner

WORKDIR /my-space
COPY --from=builder /my-space/package.json .
#COPY --from=builder /my-space/package-lock.json .
COPY --from=builder /my-space/next.config.js ./
COPY --from=builder /my-space/public ./public
COPY --from=builder /my-space/standalone ./
EXPOSE 3000
ENTRYPOINT ["node", "./server.js"]



