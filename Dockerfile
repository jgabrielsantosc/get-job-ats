FROM mcr.microsoft.com/playwright:v1.48.0-jammy

WORKDIR /app

# Copiar apenas os arquivos necessários para instalar dependências
COPY package*.json ./
RUN npm ci

# Instalar apenas o Chromium
RUN npx playwright install --with-deps chromium

# Copiar arquivos de build
COPY . .

# Build da aplicação
RUN npm run build

# Configurar variáveis de ambiente
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV NODE_ENV=production

EXPOSE 3001

CMD ["npm", "start"]
