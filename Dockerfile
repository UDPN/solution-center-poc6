FROM node:20-alpine as builder
WORKDIR /my-space

COPY package.json  pnpm-lock.yaml* ./
RUN npm install -g pnpm@8.6.0
COPY . .
RUN pnpm install
RUN pnpm build
RUN mv /my-space/.next/standalone /my-space/.next/solution-center-poc6

FROM node:20-alpine as runner
WORKDIR /my-space
COPY --from=builder /my-space/package.json .
COPY --from=builder /my-space/pnpm-lock.yaml .
COPY --from=builder /my-space/next.config.js ./
COPY --from=builder /my-space/public ./public
COPY --from=builder /my-space/.next/solution-center-poc6 ./
COPY --from=builder /my-space/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]


