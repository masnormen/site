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

# Env variables
ARG VITE_APP_ENV
ENV VITE_APP_ENV=${VITE_APP_ENV}
ARG VITE_GA_ID
ENV VITE_GA_ID=${VITE_GA_ID}
ARG VITE_GTM_ID
ENV VITE_GTM_ID=${VITE_GTM_ID}
ARG VITE_SENTRY_DSN
ENV VITE_SENTRY_DSN=${VITE_SENTRY_DSN}
ARG VITE_BUILD_SHA
ENV VITE_BUILD_SHA=${VITE_BUILD_SHA}

WORKDIR /app
COPY ./ ./
COPY --from=deps /app/node_modules /app/node_modules
RUN pnpm build

# Copy built files

FROM node:22-alpine AS runner

# Env variables
ARG VITE_APP_ENV
ENV VITE_APP_ENV=${VITE_APP_ENV}
ARG VITE_GA_ID
ENV VITE_GA_ID=${VITE_GA_ID}
ARG VITE_GTM_ID
ENV VITE_GTM_ID=${VITE_GTM_ID}
ARG VITE_SENTRY_DSN
ENV VITE_SENTRY_DSN=${VITE_SENTRY_DSN}
ARG VITE_BUILD_SHA
ENV VITE_BUILD_SHA=${VITE_BUILD_SHA}

WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.output ./.output

# Expose port and run the server

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
