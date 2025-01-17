# 🎯 Job Crawler API

Uma API universal para coletar vagas de emprego de diferentes job boards de forma automatizada.

## 📋 Sobre o Projeto

Este projeto é um web scraper especializado em coletar vagas de emprego de diferentes plataformas de recrutamento, centralizando todas as informações em uma única API. Atualmente, suportamos as seguintes plataformas:

### Portais Suportados

- ✅ Gupy
- ✅ Lever
- ✅ Greenhouse
- ✅ Workable
- ✅ BambooHR
- ✅ Breezy
- ✅ iCIMS
- ✅ Recruitee
- ✅ Factorial
- ✅ Abler
- ✅ Compleo
- ✅ Enlizt
- ✅ Gupy
- ✅ HiringRoom
- ✅ Inhire
- ✅ PandaP
- ✅ Quickin
- ✅ Recrut.ai
- ✅ Recrutei

## 🚀 Funcionalidades

- Scraping automático e em tempo real de vagas
- Sistema de cache para otimização de requisições
- Suporte a múltiplas plataformas de vagas
- Filtros personalizáveis (cargo, localização, empresa)
- API RESTful documentada com Swagger
- Exportação de dados em JSON e CSV

## 🛠️ Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Playwright (para web scraping)
- Swagger UI (documentação da API)
- Docker

## ⚙️ Configuração do Ambiente

### Pré-requisitos

- Node.js 14+
- npm ou yarn
- Docker (recomendado)

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/joaogsantosc/job-crawler-api.git
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env.local
```

4. Inicie o servidor
```bash
npm run dev
```

## 🚀 Deploy

### Desenvolvimento Local com Docker

```bash
# Iniciar em modo desenvolvimento
npm run docker:dev

# Ou manualmente
docker-compose -f docker-compose.dev.yml up
```

### Produção com Docker

```bash
# Build e iniciar em produção
npm run docker:prod

# Ou manualmente
docker-compose up
```

### Variáveis de Ambiente
Crie um arquivo `.env` com:

```env
FIRECRAWL_API_KEY=sua_chave_api
FIRECRAWL_API_URL=url_da_api
```

## 📚 Documentação da API

A documentação completa está disponível via Swagger UI em:
```
http://localhost:3001/api-docs
```

### Endpoints Principais

- `GET /scraper-job` - Lista todas as vagas disponíveis
- `GET /job-details` - Retorna as informações das vagas de qualquer plataforma (ex: gupy, workable, lever)

---

Desenvolvido com ❤️ por [João Santos](https://github.com/joaogsantosc)
```
