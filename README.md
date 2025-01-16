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

## 🔧 Variáveis de Ambiente

Configure seu arquivo `.env.local` com as seguintes variáveis:

# FireCrawl API 
FIRECRAWL_API_KEY=sua_chave_api
FIRECRAWL_API_URL=url_da_api


## 📚 Documentação da API

A documentação completa está disponível via Swagger UI em:
```
http://localhost:3001/api-docs
```

### Endpoints Principais

- `GET /api/jobs` - Lista todas as vagas disponíveis
- `GET /api/jobs/:platform` - Busca vagas de uma plataforma específica (gupy, workable, lever)
- `GET /api/jobs/search` - Pesquisa vagas com filtros personalizados

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature
   ```bash
   git checkout -b feature/NovaFeature
   ```
3. Commit suas alterações
   ```bash
   git commit -m 'Adiciona nova feature'
   ```
4. Push para a branch
   ```bash
   git push origin feature/NovaFeature
   ```
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.

## 🤔 Suporte

- Abra uma [issue](https://github.com/joaogsantosc/job-crawler-api/issues)
- Entre em contato via [email](mailto:oi@joaogabriel.cc)

## 🌟 Contribuidores

<a href="https://github.com/joaogsantosc/job-crawler-api/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=joaogsantosc/job-crawler-api" />
</a>

---

Desenvolvido com ❤️ por [João Santos](https://github.com/joaogsantosc)
```
