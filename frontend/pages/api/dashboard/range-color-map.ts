// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from '@/services/api';
import type { NextApiRequest, NextApiResponse } from 'next';

export type FilterResponse = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FilterResponse>
) {
  const { data } = await api.get('/ranges-mapa');
  res.status(200).json(data);
}
