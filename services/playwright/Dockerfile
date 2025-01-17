FROM node:18-slim

# Instalar dependências necessárias para o Chromium
RUN apt-get update && \
    apt-get install -y \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-freefont-ttf \
    libxss1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libglib2.0-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libx11-6 \
    libxcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    libxkbcommon0 \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci && \
    npx playwright install chromium --with-deps

COPY . .
RUN npm run build

ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

# Criar diretório para o Playwright e ajustar permissões
RUN mkdir -p /ms-playwright && \
    chown -R node:node /ms-playwright /app && \
    chmod -R 777 /ms-playwright

USER node

CMD ["node", "dist/services/playwright-server.js"] 