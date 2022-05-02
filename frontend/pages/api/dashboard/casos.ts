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
  totalCasosPorDiaERegiao: any;
  novosCasosPorDiaERegiao: any;
  totalCasosPorDia: any;
  novosCasosPorDia: any;
  novosCasos: any;
  totalCasos: any;
  porSintomaData: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let params = req.query || {};

  const { data: porSituacaoData } = await api.get('/casos-covid/total-casos-por-situacao', { params });
  const { data: porFaixaEtariaData } = await api.get('/casos-covid/casos-por-faixa-etaria', { params });
  const { data: porSexoData } = await api.get('/casos-covid/casos-por-sexo', { params });
  const { data: vacinacaoData } = await api.get('/casos-covid/vacinacao', { params });
  const { data: mediasComordidadeData } = await api.get('/casos-covid/medias-comorbidades', { params });
  const { data: comordidadeData } = await api.get('/casos-covid/confirmados-com-comorbidades', { params });
  const { data: totalCasosPorDiaERegiao } = await api.get('/casos-covid/total-casos-por-dia-e-regiao', { params });
  const { data: novosCasosPorDiaERegiao } = await api.get('/casos-covid/novos-casos-por-dia-e-regiao', { params });
  const { data: totalCasosPorDia } = await api.get('/casos-covid/total-casos-por-dia', { params });
  const { data: novosCasosPorDia } = await api.get('/casos-covid/novos-casos-por-dia', { params });
  const { data: novosCasos } = await api.get('/casos-covid/novos-casos', { params });
  const { data: totalCasos } = await api.get('/casos-covid/total-casos', { params });
  const { data: porSintomaData } = await api.get('/casos-covid/pacientes-por-sintomas', { params });

  res.status(200).json({
    porSituacaoData,
    porFaixaEtariaData,
    porSexoData,
    vacinacaoData,
    mediasComordidadeData,
    comordidadeData,
    totalCasosPorDiaERegiao,
    novosCasosPorDiaERegiao,
    totalCasosPorDia,
    novosCasosPorDia,
    novosCasos,
    totalCasos,
    porSintomaData,
  });
}
