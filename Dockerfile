#DEPENDENCIAS
# Usar versión específica de Node.js Alpine para seguridad y reproducibilidad
FROM node:20.11.1-alpine3.19 AS base

FROM base AS deps

# Instalar solo dependencias necesarias
RUN apk add --no-cache libc6-compat

# Actualizar paquetes del sistema para parches de seguridad
RUN apk update && \
    apk upgrade && \
    apk add --upgrade --no-cache git

WORKDIR /app

# Copiar archivos de dependencias para aprovechar caché de Docker
COPY package.json package-lock.json* ./

# Verificar integridad de paquetes con package-lock.json
# --ignore-scripts previene ejecución de scripts maliciosos en post-install
RUN npm ci --ignore-scripts --audit --legacy-peer-deps

# Eliminar git y herramientas innecesarias para reducir superficie de ataque
RUN apk del git && \
    rm -rf /var/cache/apk/*

# BUILDER
FROM base AS builder

WORKDIR /app

# Copiar solo node_modules verificados
COPY --from=deps /app/node_modules ./node_modules

COPY . .

# Copiar archivo de entorno
RUN cp .env.prod ./.env

# Construir la aplicación
RUN npm run build

# Eliminar archivos innecesarios post-build
RUN rm -rf .git node_modules/.cache

# RUNNER
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Deshabilitar telemetría de Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Crear usuario y grupo sin privilegios
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copiar archivos públicos
COPY --from=builder /app/public ./public

# Crear directorio .next con permisos correctos
RUN mkdir .next && \
    chown nextjs:nodejs .next

# Copiar artefactos de build con permisos restrictivos
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Eliminar paquetes de sistema innecesarios
RUN apk del apk-tools && \
    rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

# Cambiar a usuario sin privilegios
USER nextjs

EXPOSE 3042

ENV PORT=3042
ENV HOSTNAME="0.0.0.0"

# Healthcheck para monitoreo
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3042/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Ejecutar aplicación
CMD ["node", "server.js"]
