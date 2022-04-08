import RequestFilters from 'src/types/RequestFilters';
import { nativeWhere } from './where-builder';

export const CONFIRMADOS_EM_ACOMPANHAMENTO = (params: RequestFilters = {}) => {
  return `(
        select
            avg(c.tx_comorbidades_em_acompanhamento)::decimal +
            avg(c.tx_vacinados_em_acompanhamento)::decimal
        from hackathona.vw_casos_covid c
        ${nativeWhere(params, 'c')}
    )`.trim();
};

export const VARIACAO_CONFIRMADOS_EM_ACOMPANHAMENTO = ({
  mes_atual,
  mes_anterior,
  ...params
}) => {
  return `((
      (
        ${CONFIRMADOS_EM_ACOMPANHAMENTO({ ...params, inicio: mes_atual, fim: mes_atual })} / 
        ${CONFIRMADOS_EM_ACOMPANHAMENTO({ ...params, inicio: mes_anterior, fim: mes_anterior })}
      ) - 1) * 100
    )`.trim();
};

export const CONFIRMADOS_INTERNADOS = (params: RequestFilters = {}) => {
  return `(
          select
              avg(c.tx_comorbidades_internados)::decimal +
              avg(c.tx_vacinados_internados)::decimal
          from hackathona.vw_casos_covid c
          ${nativeWhere(params, 'c')}
      )`.trim();
};

export const VARIACAO_CONFIRMADOS_INTERNADOS = ({
  mes_atual,
  mes_anterior,
  ...params
}) => {
  return `((
        (
          ${CONFIRMADOS_INTERNADOS({ ...params, inicio: mes_atual, fim: mes_atual })} / 
          ${CONFIRMADOS_INTERNADOS({ ...params, inicio: mes_anterior, fim: mes_anterior })}
        ) - 1) * 100
      )`.trim();
};

export const TOTAL_CASOS = ({ ds_mes }) => {
  return `(select sum(c.qt_total_casos) from hackathona.vw_casos_covid c where c.ds_mes = '${ds_mes}')`.trim();
};

export const VARIACAO_TOTAL_CASOS = ({
  mes_atual,
  mes_anterior,
  ...params
}) => {
  return `(
        (
            (
                (select sum(c.qt_total_casos)::decimal from hackathona.vw_casos_covid c  ${nativeWhere(
                  { ...params, inicio: mes_atual, fim: mes_atual },
                  'c',
                )}) / 
                (select sum(c.qt_total_casos)::decimal from hackathona.vw_casos_covid c  ${nativeWhere(
                  { ...params, inicio: mes_anterior, fim: mes_anterior },
                  'c',
                )}))
        - 1)
        * 100
    )`.trim();
};

export const NOVOS_CASOS = ({ inicio, fim, ...params }) => {
  return `(select coalesce(sum(c.qt_novos_casos), 0) from hackathona.vw_casos_covid c ${nativeWhere(
    { ...params, inicio, fim },
    'c',
  )})`.trim();
};

export const VARIACAO_NOVOS_CASOS = ({
  mes_atual,
  mes_anterior,
  ...params
}) => {
  return `(
          (
              (
                  (select coalesce(sum(c.qt_novos_casos), 0)::decimal from hackathona.vw_casos_covid c ${nativeWhere(
                    { ...params, inicio: mes_atual, fim: mes_atual },
                    'c',
                  )}) / 
                  (select coalesce(sum(c.qt_novos_casos), 1)::decimal from hackathona.vw_casos_covid c ${nativeWhere(
                    { ...params, inicio: mes_anterior, fim: mes_anterior },
                    'c',
                  )}))
          - 1)
          * 100
      )`.trim();
};

export const VARIACAO_CASOS_SINTOMAS_LEVES = ({
  mes_atual,
  mes_anterior,
  ...params
}) => {
  return `(
          (
              (
                  (select sum(c.tx_sintomas_leves)::decimal from hackathona.vw_casos_covid c ${nativeWhere(
                    { ...params, inicio: mes_atual, fim: mes_atual },
                    'c',
                  )}) / 
                  (select sum(c.tx_sintomas_leves)::decimal from hackathona.vw_casos_covid c ${nativeWhere(
                    { ...params, inicio: mes_anterior, fim: mes_anterior },
                    'c',
                  )}))
          - 1)
          * 100
      )`.trim();
};

export const VARIACAO_CASOS_SINTOMAS_GRAVES = ({
  mes_atual,
  mes_anterior,
  ...params
}) => {
  return `(
          (
              (
                  (select sum(c.tx_sintomas_graves)::decimal from hackathona.vw_casos_covid c ${nativeWhere(
                    { ...params, inicio: mes_atual, fim: mes_atual },
                    'c',
                  )}) / 
                  (select sum(c.tx_sintomas_graves)::decimal from hackathona.vw_casos_covid c ${nativeWhere(
                    { ...params, inicio: mes_anterior, fim: mes_anterior },
                    'c',
                  )}))
          - 1)
          * 100
      )`.trim();
};

export const VARIACAO_CASOS_ASSINTOMATICOS = ({
  mes_atual,
  mes_anterior,
  ...params
}) => {
  return `(
          (
              (
                  (select sum(c.tx_assintomaticos)::decimal from hackathona.vw_casos_covid c ${nativeWhere(
                    { ...params, inicio: mes_atual, fim: mes_atual },
                    'c',
                  )}) / 
                  (select sum(c.tx_assintomaticos)::decimal from hackathona.vw_casos_covid c ${nativeWhere(
                    { ...params, inicio: mes_anterior, fim: mes_anterior },
                    'c',
                  )}))
          - 1)
          * 100
      )`.trim();
};

// export const MES_MAIS_RECENTE = tableName => `
//   (select ds_mes as mes_mais_recente from hackathona.${tableName} group by ds_mes order by right(ds_mes, 4) || left(ds_mes, 2) desc limit 1)
// `.trim();

export const FILTRO_BAIRRO = (tableName: string) =>
  `
  select 
    replace(substring(nm_estabelecimento, POSITION('- ' in nm_estabelecimento)), '- ', '') as label,
    replace(substring(nm_estabelecimento, POSITION('- ' in nm_estabelecimento)), '- ', '') as value 
   from hackathona.${tableName}
  group by replace(substring(nm_estabelecimento, POSITION('- ' in nm_estabelecimento)), '- ', '')
`.trim();
