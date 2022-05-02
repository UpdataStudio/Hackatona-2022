// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from '@/services/api';
import type { NextApiRequest, NextApiResponse } from 'next'

export type DadosPorDia = {
  data: string;
  valor: string;
};

export type DadosPorMes = {
  data: string;
  rt_pcr: string,
  rt_lamp: string,
  sorologico_iga: string,
  sorologico_igm: string,
  sorologico_igg: string,
  anticorpos_totais: string
};

type Data = {
  testagemData: any;
  testesRealizadosPorDia: any;
  comSintomasPorDia: any;
  semSintomasPorDia: any;
  novosTestesPorDia: any;
  evolucaoTestesPorMes: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let params = req.query || {};

  const { data: testagemData } = await api.get('/testagem', { params });
  const { data: testesRealizadosPorDia } = await api.get('/testagem/testes-realizados-por-dia', { params });
  const { data: comSintomasPorDia } = await api.get('/testagem/com-sintomas-por-dia', { params });
  const { data: semSintomasPorDia } = await api.get('/testagem/sem-sintomas-por-dia', { params });
  const { data: novosTestesPorDia } = await api.get('/testagem/novos-testes-por-dia', { params });
  const { data: evolucaoTestesPorMes } = await api.get('/testagem/evolucao-mensal-testes-realizados', { params });

  res.status(200).json({
    testagemData: testagemData[0],
    testesRealizadosPorDia,
    comSintomasPorDia,
    semSintomasPorDia,
    novosTestesPorDia,
    evolucaoTestesPorMes
  });
}
