FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY ./pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

FROM base AS builder

WORKDIR /app
COPY ./ ./
COPY --from=deps /app/node_modules /app/node_modules
RUN pnpm build

FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/app/contents ./app/contents
COPY --from=builder /app/.vinxi ./.vinxi
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
# For ESBuild
COPY --from=builder /app/tsconfig.json ./tsconfig.json

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
