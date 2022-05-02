// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from '@/services/api';
import type { NextApiRequest, NextApiResponse } from 'next'

export type DadosPorDia = {
  data: string;
  valor: string;
};

type Data = {
  obitoData: any;
  totalPorDia: DadosPorDia[],
  novosPorDia: DadosPorDia[],
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let params = req.query || {};

  const { data: obitoData } = await api.get('/obito', { params });
  const { data: totalPorDia } = await api.get('/obito/total-obitos-por-dia', { params });
  const { data: novosPorDia } = await api.get('/obito/novos-obitos-por-dia', { params });

  res.status(200).json({
    obitoData: obitoData[0],
    totalPorDia,
    novosPorDia,
  });
}
