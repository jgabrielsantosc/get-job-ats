FROM node:18-slim

WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json tsconfig*.json ./

# Instalar todas as dependências (incluindo devDependencies) para build
RUN npm ci

# Copiar código fonte
COPY . .

# Criar pasta dist e fazer o build
RUN mkdir -p dist && npm run build:api

# Limpar devDependencies após o build
RUN npm ci --omit=dev

ENV NODE_ENV=production \
    PORT=3001 \
    HOST=0.0.0.0

USER node

CMD ["npm", "start"] 