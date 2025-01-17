FROM node:18-slim

WORKDIR /app

# Copiar apenas os arquivos necessários para instalação de dependências
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --omit=dev

# Copiar o resto dos arquivos
COPY . .

# Remover o script prebuild do package.json que tenta instalar o Playwright
RUN sed -i '/"prebuild":/d' package.json && \
    npm run build

ENV NODE_ENV=production \
    PORT=3001 \
    HOST=0.0.0.0

USER node

CMD ["npm", "start"]
