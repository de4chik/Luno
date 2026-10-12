FROM oven/bun:1 AS base

WORKDIR /usr/src/app

COPY package.json bun.lock* ./

RUN bun install

COPY . .

RUN bun run build

EXPOSE 5000

CMD ["node", "dist/main"]