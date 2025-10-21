#DEPENDENCIAS
FROM node:20-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat

RUN apk update && \
    apk upgrade && \
    apk add --upgrade --no-cache git

WORKDIR /app

COPY package.json ./

RUN npm install --legacy-peer-deps

# BUILDER
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .


RUN npm run build

# RUNNER
FROM base AS runner

RUN apk update && apk add --no-cache bash iputils

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

#USER nextjs

EXPOSE 3042
    
ENV PORT=3042

CMD ["node", "server.js"]