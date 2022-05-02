// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from '@/services/api';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { data } = await api.get('/filters', { params: req.query });
  const { data: filtrosVacina } = await api.get('/vacinas/filters', {
    params: req.query
  });
  res.status(200).json({...data, ...filtrosVacina})
}
