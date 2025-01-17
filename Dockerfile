FROM node:18-slim

# Instalar apenas as dependências essenciais para o Chromium
RUN apt-get update && \
    apt-get install -y \
    libglib2.0-0 \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libxcb1 \
    libxkbcommon0 \
    libx11-6 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar apenas os arquivos de dependências primeiro
COPY package*.json ./

# Instalar dependências de produção
RUN npm ci --only=production && \
    # Configurar variáveis do Playwright antes da instalação
    PLAYWRIGHT_BROWSERS_PATH=/ms-playwright \
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
    npm i playwright && \
    # Instalar apenas o Chromium
    npx playwright install chromium --with-deps

# Copiar o resto dos arquivos
COPY . .

# Build
RUN npm run build

# Configurar variáveis de ambiente
ENV NODE_ENV=production
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV PORT=3001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

EXPOSE 3001

# Configurar usuário não-root
RUN groupadd -r nodejs && useradd -r -g nodejs -G audio,video nodejs \
    && chown -R nodejs:nodejs /app

USER nodejs

CMD ["node", "dist/api.js"]
