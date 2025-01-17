import express from 'express';
import { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import { ExpressHandler } from './types';
import { handleJobDetailsRequest } from './routes/unified-job-details';
import { unifiedUrlScraper } from './routes/urls-scraper';
import dotenv from 'dotenv';
import path from 'path';

// Carrega as variáveis de ambiente
dotenv.config({ 
  path: path.resolve(__dirname, '../.env'),
});
// Carrega variáveis locais se não estiver em produção
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ 
    path: path.resolve(__dirname, '../.env.local'),
    override: true 
  });
}

// Validação de variáveis obrigatórias
const requiredEnvVars = [
  'FIRECRAWL_API_KEY',
  'FIRECRAWL_API_URL',
  'GUPY_BUILD_ID'
];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`❌ Variável de ambiente ${varName} não definida`);
    process.exit(1);
  }
});

// Configuração inicial
console.log('🚀 Iniciando aplicação...');
console.log('\n📋 Variáveis de ambiente:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('HOST:', process.env.HOST);
console.log('PLAYWRIGHT_BROWSERS_PATH:', process.env.PLAYWRIGHT_BROWSERS_PATH);
console.log('FIRECRAWL_API_KEY:', process.env.FIRECRAWL_API_KEY ? 'Definido' : 'Não definido');
console.log('FIRECRAWL_API_URL:', process.env.FIRECRAWL_API_URL);

const app = express();
const port = parseInt(process.env.PORT || '3001', 10);
const host = process.env.HOST || '0.0.0.0';

app.use(express.json());

// Swagger configuration
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Job Scraper API',
    version: '1.0.0',
    description: 'API para coletar informações de vagas de diferentes plataformas'
  },
  paths: {
    '/scraper-job': {
      post: {
        summary: 'Coletar informações de vagas de qualquer job board',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  url: {
                    type: 'string',
                    description: 'URL do job board'
                  }
                },
                required: ['url']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Informações das vagas coletadas com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    totalVagas: {
                      type: 'integer'
                    },
                    vagas: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          url_job: { type: 'string' }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          '400': {
            description: 'URL não fornecida ou job board não suportado'
          },
          '500': {
            description: 'Erro ao processar a requisição'
          }
        }
      }
    },
    '/job-details': {
      post: {
        summary: 'Coletar informações detalhadas de uma vaga',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  url: {
                    type: 'string',
                    description: 'URL da vaga no job board'
                  }
                },
                required: ['url']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Informações da vaga coletadas com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    location: { type: 'string' },
                    description: { type: 'string' },
                    // Outros campos específicos de cada job board...
                  }
                }
              }
            }
          },
          '400': {
            description: 'URL não fornecida ou job board não suportado'
          },
          '500': {
            description: 'Erro ao processar a requisição'
          }
        }
      }
    }
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rota única para processar detalhes de qualquer job board
app.post('/job-details', handleJobDetailsRequest);

// Rota única para processar qualquer job board
app.post('/scraper-job', unifiedUrlScraper);

// Adicionar rota de health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy' });
});

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ error: 'JSON inválido' });
  } else {
    console.error('Erro:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

const server = app.listen(port, host, () => {
  console.log('\n🌐 Servidor iniciado com sucesso:');
  console.log(`📍 URL local: http://localhost:${port}`);
  console.log(`🌍 URL externa: http://${host}:${port}`);
  console.log(`📚 Documentação: http://${host}:${port}/api-docs`);
  console.log(`💓 Health check: http://${host}:${port}/health`);
});