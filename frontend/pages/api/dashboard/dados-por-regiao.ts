// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from '@/services/api';
import type { NextApiRequest, NextApiResponse } from 'next'

export type FilterResponse = {
  vacina: any;
  casos: any;
  testagem: any;
  obito: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FilterResponse>
) {
  const { fabricante, acima_12_anos, ...params } = req.query || {};
  const filtrosVacina = { fabricante, acima_12_anos, ...params };

  const { data: vacina } = await api.get('/vacinas/dados-por-regiao', { params: filtrosVacina });
  const { data: casos } = await api.get('/casos-covid/dados-por-regiao', { params });
  const { data: testagem } = await api.get('/testagem/dados-por-regiao', { params });
  const { data: obito } = await api.get('/obito/dados-por-regiao', { params });

  res.status(200).json({
    vacina,
    casos,
    testagem,
    obito,
  });
}
