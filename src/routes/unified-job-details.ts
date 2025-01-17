import { Request, Response, NextFunction } from 'express';
import { ExpressHandler } from '../types';
import { jobInhireHandler } from './inhire/job-inhire';
import { jobGupyHandler } from './gupy/job-gupy';
import { jobAblerHandler } from './abler/job-abler';
import { jobLeverHandler } from './lever/job-lever';
import { jobQuickinHandler } from './quickin/job-quickin';
import { jobSolidesHandler } from './solides/job-solides';
import { jobGreenhouseHandler } from './greenhouse/job-greenhouse';
import { jobWorkableHandler } from './workable/job-workable';
import { jobRecruteiHandler } from './recruitei/job-recrutei';
import { jobRecrutHandler } from './recruitai/job-recrut';
import { jobBreezyHandler } from './breezy/job-breezy';
import { jobFactorialHandler } from './factorial/job-factorial';
import { jobEnliztHandler } from './enlizt/job-enlizt';
import { jobBambooHandler } from './bamboo/job-bamboo';
import { jobWorkdayHandler } from './workday/job-workday';
import { jobHireroomHandler } from './hireroom/job-hireroom';
import { jobPandapeHandler } from './pandape/job-pandape';
import { jobIcimsHandler } from './icims/job-icims';
import { jobRecruiteeHandler } from './recruitee/job-recruitee';

// Mapeamento de URLs para handlers
const jobBoardHandlers: { [key: string]: ExpressHandler } = {
  'inhire.app': jobInhireHandler,
  'gupy.io': jobGupyHandler,
  'abler': jobAblerHandler,
  'lever.co': jobLeverHandler,
  'quickin': jobQuickinHandler,
  'solides': jobSolidesHandler,
  'greenhouse.io': jobGreenhouseHandler,
  'workable.com': jobWorkableHandler,
  'recrutei.com.br': jobRecruteiHandler,
  'recrut.ai': jobRecrutHandler,
  'breezy.hr': jobBreezyHandler,
  'factorialhr': jobFactorialHandler,
  'enlizt.me': jobEnliztHandler,
  'bamboohr': jobBambooHandler,
  'myworkdayjobs.com': jobWorkdayHandler,
  'hiringroom.com': jobHireroomHandler,
  'pandape.infojobs.com.br': jobPandapeHandler,
  'icims.com': jobIcimsHandler,
  'recruitee.com': jobRecruiteeHandler,
};

// Função para identificar o job board e chamar o handler apropriado
export const handleJobDetailsRequest: ExpressHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { url } = req.body;
  if (!url) {
    res.status(400).json({ error: 'URL não fornecida' });
    return;
  }

  console.log(`Processando URL: ${url}`);

  const jobBoard = Object.keys(jobBoardHandlers).find(key => url.includes(key));
  if (!jobBoard) {
    res.status(400).json({ error: 'Job board não suportado' });
    return;
  }

  console.log(`Job board identificado: ${jobBoard}`);

  try {
    const handler = jobBoardHandlers[jobBoard];
    await handler(req, res, next);
  } catch (error) {
    console.error(`Erro ao processar a vaga do ${jobBoard}:`, error);
    res.status(500).json({ error: `Erro ao processar a vaga do ${jobBoard}` });
  }
};
