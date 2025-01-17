FROM node:18-slim

# Instalar Chrome e dependências necessárias
RUN apt-get update && \
    apt-get install -y wget gnupg2 && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
    apt-get update && \
    apt-get install -y \
    google-chrome-stable \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-freefont-ttf \
    libxss1 \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências e Playwright
RUN npm ci && \
    npx playwright install chromium --with-deps

# Copiar o resto dos arquivos
COPY . .

# Build
RUN npm run build

# Configurar variáveis de ambiente
ENV NODE_ENV=production \
    PLAYWRIGHT_BROWSERS_PATH=/ms-playwright \
    PORT=3001 \
    HOST=0.0.0.0

# Criar diretório para o Playwright e ajustar permissões
RUN mkdir -p /ms-playwright && \
    chown -R node:node /ms-playwright /app && \
    chmod -R 777 /ms-playwright

# Mudar para usuário não-root
USER node

CMD ["npm", "start"]
