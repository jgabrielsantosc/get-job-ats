FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

ENV NODE_ENV=production \
    PORT=3001 \
    HOST=0.0.0.0

USER node

CMD ["npm", "start"]
