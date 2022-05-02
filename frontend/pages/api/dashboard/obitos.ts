// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from '@/services/api';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  porSituacaoData: any;
  porFaixaEtariaData: any;
  porSexoData: any;
  vacinacaoData: any;
  mediasComordidadeData: any;
  comordidadeData: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let params = req.query || {};

  const { data: porSituacaoData } = await api.get('/obito10\/total-casos-por-situacao', { params });
  const { data: porFaixaEtariaData } = await api.get('/casos-covid/casos-por-faixa-etaria', { params });
  const { data: porSexoData } = await api.get('/casos-covid/casos-por-sexo', { params });
  const { data: vacinacaoData } = await api.get('/casos-covid/vacinacao', { params });
  const { data: mediasComordidadeData } = await api.get('/casos-covid/medias-comorbidades', { params });
  const { data: comordidadeData } = await api.get('/casos-covid/confirmados-com-comorbidades', { params });

  res.status(200).json({
    porSituacaoData,
    porFaixaEtariaData,
    porSexoData,
    vacinacaoData,
    mediasComordidadeData,
    comordidadeData,
  });
}
