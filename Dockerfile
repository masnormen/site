# Dockerfile for building from scratch

FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV COREPACK_INTEGRITY_KEYS=0
RUN corepack enable

# Install packages

FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY ./pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# Build project

FROM base AS builder

WORKDIR /app
COPY ./ ./
COPY --from=deps /app/node_modules /app/node_modules
RUN pnpm build

# Copy built files

FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/app/contents ./app/contents
COPY --from=builder /app/.vinxi ./.vinxi
COPY --from=builder /app/.output ./.output
# For ESBuild
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Expose port and run the server

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
