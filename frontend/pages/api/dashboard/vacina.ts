// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from '@/services/api';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  dosesData: any;
  estoqueData: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let params = req.query || {};

  const { data: dosesData } = await api.get('/vacinas/doses', { params });
  const { data: estoqueData } = await api.get('/vacinas/estoque', { params });

  res.status(200).json({
    dosesData,
    estoqueData,
  });
}
