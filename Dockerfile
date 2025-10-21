FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=true
RUN corepack enable

FROM base AS installer
WORKDIR /app

ARG VITE_API_URL

COPY . .
RUN pnpm install --frozen-lockfile

ENV VITE_API_URL=${VITE_API_URL}
ENV NODE_ENV=production

RUN pnpm build

FROM nginx:alpine AS runner

WORKDIR /app

COPY --from=installer /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
