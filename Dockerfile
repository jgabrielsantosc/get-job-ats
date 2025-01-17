FROM mcr.microsoft.com/playwright:v1.48.0-jammy

# Instalar curl para healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Instalar Chromium com dependências necessárias
RUN npx playwright install chromium --with-deps

# Copiar o resto dos arquivos
COPY . .

# Build da aplicação
RUN npm run build

# Configurar variáveis de ambiente
ENV NODE_ENV=production
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV PORT=3001

# Adicionar healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

EXPOSE 3001

# Especificar comando explicitamente para o App Platform
CMD ["node", "dist/api.js"]
