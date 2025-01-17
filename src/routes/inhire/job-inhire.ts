import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { ExpressHandler } from '../../types';


interface InhireJobDetails {
  tenantName: string;
  description: string;
  displayName: string;
  workplaceType: string;
  location: string;
  // Adicione outros campos conforme necessário
}

export const jobInhireHandler: ExpressHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { url } = req.body;

  if (!url) {
    res.status(400).json({ error: 'URL parameter is required' });
    return;
  }

  try {
    // Extrair tenant e jobId da URL
    const urlMatch = url.match(/https?:\/\/([^.]+)\.inhire\.app\/vagas\/([^/?]+)/);
    
    // Se a URL não contém um ID de vaga específico, retornar erro apropriado
    if (!urlMatch || !urlMatch[2]) {
      res.status(400).json({ 
        error: 'URL inválida',
        message: 'A URL deve ser de uma vaga específica do Inhire (ex: https://empresa.inhire.app/vagas/123-id-da-vaga)'
      });
      return;
    }

    const [, tenant, jobId] = urlMatch;

    const response = await axios.get<InhireJobDetails>(
      `https://api.inhire.app/job-posts/public/pages/${jobId}`,
      {
        headers: {
          'Accept': 'application/json',
          'X-Tenant': tenant
        }
      }
    );

    const { data } = response;

    // Formatar o conteúdo da vaga em markdown
    const jobContent = `
# ${data.displayName}

${data.description}

**Localização:** ${data.location}
**Tipo de Trabalho:** ${data.workplaceType}
**Empresa:** ${data.tenantName}
    `.trim();

    res.json({ content: jobContent });

  } catch (error: any) {
    console.error('Erro ao coletar informações da vaga:', error);
    
    // Melhor tratamento de erros específicos
    if (error.message === 'URL inválida') {
      res.status(400).json({
        error: 'URL inválida',
        message: 'Formato de URL não suportado'
      });
      return;
    }

    res.status(500).json({
      error: 'Erro ao coletar informações da vaga',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};