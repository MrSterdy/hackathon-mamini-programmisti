FROM oven/bun:1.0.3 as build

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY . .

RUN bun run check
RUN bun run build

FROM oven/bun:1.0.3 as prod

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package.json .
COPY --from=build /app/bun.lockb .
COPY --from=build /app/build .

RUN bun install

EXPOSE 3000

CMD ["bun", "index.js"]