import RequestFilters from '../types/RequestFilters';
import { nativeWhere } from './where-builder';
import * as Tables from '../constants/Tables';

export const CONFIRMADOS_EM_ACOMPANHAMENTO = (params: RequestFilters = {}) => {
  return `(
        select 
          (
            avg(c.tx_comorbidades_em_acompanhamento)::decimal +
            avg(c.tx_vacinados_em_acompanhamento)::decimal
          ) * 100
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
        ${CONFIRMADOS_EM_ACOMPANHAMENTO({ ...params, inicio: mes_atual.inicio, fim: mes_atual.fim })} / 
        ${CONFIRMADOS_EM_ACOMPANHAMENTO({ ...params, inicio: mes_anterior.inicio, fim: mes_anterior.fim })}
      ) - 1) * 100
    )`.trim();
};

export const CONFIRMADOS_INTERNADOS = (params: RequestFilters = {}) => {
  return `(
          select
            (
              avg(c.tx_comorbidades_internados)::decimal +
              avg(c.tx_vacinados_internados)::decimal
            ) * 100
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
          ${CONFIRMADOS_INTERNADOS({ ...params, inicio: mes_atual.inicio, fim: mes_atual.fim })} / 
          ${CONFIRMADOS_INTERNADOS({ ...params, inicio: mes_anterior.inicio, fim: mes_anterior.fim })}
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
                  { ...params, inicio: mes_atual.inicio, fim: mes_atual.fim },
                  'c',
                )}) / 
                (select sum(c.qt_total_casos)::decimal from hackathona.vw_casos_covid c  ${nativeWhere(
                  { ...params, inicio: mes_anterior.inicio, fim: mes_anterior.fim },
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
                    { ...params, inicio: mes_atual.inicio, fim: mes_atual.fim },
                    'c',
                  )}) / 
                  (select coalesce(sum(c.qt_novos_casos), 1)::decimal from hackathona.vw_casos_covid c ${nativeWhere(
                    { ...params, inicio: mes_anterior.inicio, fim: mes_anterior.fim },
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
  return `
    (
      (
        (
          (select sum(c.tx_sintomas_leves)::decimal from hackathona.vw_casos_covid c ${nativeWhere(
            { ...params, inicio: mes_atual.inicio, fim: mes_atual.fim },
            'c',
          )}) / 
          (select sum(c.tx_sintomas_leves)::decimal from hackathona.vw_casos_covid c ${nativeWhere(
            { ...params, inicio: mes_anterior.inicio, fim: mes_anterior.fim },
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
                    { ...params, inicio: mes_atual.inicio, fim: mes_atual.fim },
                    'c',
                  )}) / 
                  (select sum(c.tx_sintomas_graves)::decimal from hackathona.vw_casos_covid c ${nativeWhere(
                    { ...params, inicio: mes_anterior.inicio, fim: mes_anterior.fim },
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
                    { ...params, inicio: mes_atual.inicio, fim: mes_atual.fim },
                    'c',
                  )}) / 
                  (select sum(c.tx_assintomaticos)::decimal from hackathona.vw_casos_covid c ${nativeWhere(
                    { ...params, inicio: mes_anterior.inicio, fim: mes_anterior.fim },
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

export const OBITOS_VACINADOS = (params) => {
  return `(SELECT SUM(qt_total_obitos) FROM hackathona.vw_obitos ${nativeWhere(params)} AND ds_vacinados = 'Sim' )`.trim();
}

export const OBITOS_NAO_VACINADOS = (params) => {
  return `(SELECT SUM(qt_total_obitos) FROM hackathona.vw_obitos ${nativeWhere(params)} AND ds_vacinados = 'Não' )`.trim();
}

export const COMORBIDADE_DOENCA_RESPIRATORIA = (params) => {
  return `(SELECT avg(tx_obitos) * 100 FROM hackathona.vw_obitos ${nativeWhere(params)} AND ds_comorbidades = 'Doenças respiratórias crônicas descompensadas' )`.trim();
}

export const COMORBIDADE_DOENCA_CARDIACA = (params) => {
  return `(SELECT avg(tx_obitos) * 100 FROM hackathona.vw_obitos ${nativeWhere(params)} AND ds_comorbidades = 'Doenças cardíacas crônicas' )`.trim();
}

export const COMORBIDADE_IMUNOSSUPRIMIDOS = (params) => {
  return `(SELECT avg(tx_obitos) * 100 FROM hackathona.vw_obitos ${nativeWhere(params)} AND ds_comorbidades = 'Imunossuprimidos' )`.trim();
}

export const COMORBIDADE_DIABETICOS = (params) => {
  return `(SELECT avg(tx_obitos) * 100 FROM hackathona.vw_obitos ${nativeWhere(params)} AND ds_comorbidades = 'Diabéticos' )`.trim();
}

export const TESTE_RT_PCR = `(SELECT COUNT(tp_teste) FROM hackathona.vw_testagem WHERE tp_teste = 'RT-PCR' )`.trim();
export const TESTE_RT_LAMP = `(SELECT COUNT(tp_teste) FROM hackathona.vw_testagem WHERE tp_teste = 'RT-LAMP' )`.trim();
export const TESTE_SOROLOGICO_IGA = `(SELECT COUNT(tp_teste) FROM hackathona.vw_testagem WHERE tp_teste = 'Sorológico IgA' )`.trim();
export const TESTE_SOROLOGICO_IGM = `(SELECT COUNT(tp_teste) FROM hackathona.vw_testagem WHERE tp_teste = 'Sorológico IgM' )`.trim();
export const TESTE_SOROLOGICO_IGG = `(SELECT COUNT(tp_teste) FROM hackathona.vw_testagem WHERE tp_teste = 'Sorológico IgG' )`.trim();
export const TESTE_ANTICORPOS_TOTAIS = `(SELECT COUNT(tp_teste) FROM hackathona.vw_testagem WHERE tp_teste = 'Anticorpos Totais' )`.trim();

export const PERCENTUAL_SITUACAO_PACIENTE = (params) => {
  return `(100 * sum(qt_total_casos)::decimal / (select sum(qt_total_casos) from hackathona.vw_casos_covid ${nativeWhere(params)}))`;
}

export const PERCENTUAL_ESTOQUE_VS_APLICADA = `
  (100 * sum(qt_estoque)::decimal / sum(qt_estoque + qt_aplicada))
`.trim();

export const PERCENTUAL_APLICADA_VS_ESTOQUE = `
  (100 * sum(qt_aplicada)::decimal / sum(qt_estoque + qt_aplicada))
`.trim();

export const VARIACAO_TESTES_REALIZADOS = ({
  mes_atual,
  mes_anterior,
  ...params
}) => {
  return `(
          (
              (
                  (select coalesce(sum(c.qt_testes_realizados), 0)::decimal from hackathona.vw_testagem c ${nativeWhere(
                    { ...params, inicio: mes_atual, fim: mes_atual },
                    'c',
                  )}) / 
                  (select coalesce(sum(c.qt_testes_realizados), 1)::decimal from hackathona.vw_testagem c ${nativeWhere(
                    { ...params, inicio: mes_anterior, fim: mes_anterior },
                    'c',
                  )}))
          - 1)
          * 100
      )`.trim();
};

export const VARIACAO = ({
  tableName,
  columName,
  operator = 'sum',
  mes_atual,
  mes_anterior,
  ...params
}) => {
  return `
    (
      (
        (
          (select coalesce(${operator}(v.${columName}), 0)::decimal from hackathona.${tableName} v ${nativeWhere(
            { ...params, inicio: mes_atual.inicio, fim: mes_atual.fim },
            'v',
          )}) / 
          (select coalesce(${operator}(v.${columName}), 1)::decimal from hackathona.${tableName} v ${nativeWhere(
            { ...params, inicio: mes_anterior.inicio, fim: mes_anterior.fim },
            'v',
          )}))
      - 1)
    * 100
  )`.trim();
};

export const DADOS_VACINA_POR_REGIAO = (params) => `
  SELECT 
    Vacinas.ds_regiao, 
    Vacinas.ds_dose,
    Ubs.pk_ubs_cnes as id,
    Ubs.nm_estabelecimento as nome,
    Ubs.co_lat as latitude,
    Ubs.co_lon as longitude,
    avg(tx_dose) * 100 as porcentagem_aplicada
  FROM hackathona.vw_vacinas AS Vacinas
  LEFT JOIN hackathona.dim_ubs Ubs 
    ON Ubs.pk_ubs_cnes = Vacinas.pk_ubs_cnes 
  ${nativeWhere(params, 'Vacinas')}
  GROUP BY
    Vacinas.ds_regiao,
    Vacinas.ds_dose,
    Ubs.pk_ubs_cnes,
    Ubs.nm_estabelecimento,
    Ubs.co_lat,
    Ubs.co_lon;
`.trim();

export const DADOS_CASOS_POR_REGIAO = (params) => `
  SELECT 
    Casos.ds_regiao AS regiao, 
    coalesce(sum(Casos."qt_novos_casos"), 0) AS "novos_casos",
    coalesce(sum(Casos."qt_total_casos"), 0) AS "total_casos",
    (
      (
        (
          (select coalesce(sum(c.qt_novos_casos), 0)::decimal from hackathona.vw_casos_covid c  ${nativeWhere(params, 'Casos')}) / 
          (select coalesce(sum(c.qt_novos_casos), 1)::decimal from hackathona.vw_casos_covid c  ${nativeWhere(params, 'Casos')}))
    - 1)
      * 100
    ) AS "variacao_novos_casos", (
      (
        (
          (select sum(c.qt_total_casos)::decimal from hackathona.vw_casos_covid c ${nativeWhere(params, 'Casos')}) / 
          (select sum(c.qt_total_casos)::decimal from hackathona.vw_casos_covid c ${nativeWhere(params, 'Casos')}))
    - 1)
      * 100
    ) AS variacao_total_casos ,
    Ubs.nm_estabelecimento as nome_ubs,
    Ubs.co_lat as latitude,
    Ubs.co_lon as longitude
  FROM hackathona.vw_casos_covid AS Casos 
  LEFT JOIN hackathona.dim_ubs Ubs 
    ON Ubs.pk_ubs_cnes = Casos.pk_ubs_cnes 
  ${nativeWhere({ ...params, fim: params.inicio }, 'Casos')}
  GROUP BY 
    Casos.ds_regiao,
    Ubs.nm_estabelecimento,
    Ubs.co_lat,
    Ubs.co_lon
`.trim();

export const DADOS_OBITOS_POR_REGIAO = (params) => {
  return `
    SELECT 
      Obitos.ds_regiao as regiao,
      Ubs.pk_ubs_cnes as id,
      Ubs.nm_estabelecimento as nome,
      Ubs.co_lat as latitude,
      Ubs.co_lon as longitude,
      sum(qt_total_obitos) as qt_total_obito,
      sum(qt_novos_obitos) as qt_novos_obito,
      avg(tx_letalidade) as tx_letalidade,
      avg(tx_mortalidade) as tx_mortalidade,
      ${VARIACAO({
        ...params,
        tableName: Tables.OBITOS,
        columName: 'qt_total_obitos',
        mes_anterior: params.periodo.anterior,
        mes_atual: params.periodo.atual,
      })} as variacao_total_obitos,
      ${VARIACAO({
        ...params,
        tableName: Tables.OBITOS,
        columName: 'qt_novos_obitos',
        mes_anterior: params.periodo.anterior,
        mes_atual: params.periodo.atual,
      })} as variacao_novos_obitos    
    FROM hackathona.vw_obitos AS Obitos
    LEFT JOIN hackathona.dim_ubs Ubs 
    ON Ubs.pk_ubs_cnes = Obitos.pk_ubs_cnes
    ${nativeWhere(params, 'Obitos')}
    GROUP BY
      Obitos.ds_regiao,
      Ubs.pk_ubs_cnes,
      Ubs.nm_estabelecimento,
      Ubs.co_lat,
      Ubs.co_lon
  `.trim();
};

export const DADOS_TESTAGEM_POR_REGIAO = (params) => {
  return `
    SELECT 
      Testagem.ds_regiao as regiao,
      Ubs.pk_ubs_cnes as id,
      Ubs.nm_estabelecimento as nome,
      Ubs.co_lat as latitude,
      Ubs.co_lon as longitude,
      coalesce(sum(qt_testes_realizados), 0) as testes_realizados,
      avg(tx_negativos) as tx_negativos,
      avg(tx_positivos) as tx_positivos,
      avg(tx_com_sintomas) as tx_com_sintomas,
      avg(tx_sem_sintomas) as tx_sem_sintomas,
      avg(tx_novo_teste) as tx_novo_teste,
      ${VARIACAO({
        ...params,
        tableName: Tables.TESTAGEM,
        columName: 'qt_testes_realizados',
        mes_anterior: params.periodo.anterior,
        mes_atual: params.periodo.atual,
      })} as variacao_testes_realizados,
      ${VARIACAO({
        ...params,
        tableName: Tables.TESTAGEM,
        columName: 'tx_com_sintomas',
        operator: 'avg',
        mes_anterior: params.periodo.anterior,
        mes_atual: params.periodo.atual,
      })} as variacao_com_sintomas,
      ${VARIACAO({
        ...params,
        tableName: Tables.TESTAGEM,
        columName: 'tx_sem_sintomas',
        operator: 'avg',
        mes_anterior: params.periodo.anterior,
        mes_atual: params.periodo.atual,
      })} as variacao_sem_sintomas,
      ${VARIACAO({
        ...params,
        tableName: Tables.TESTAGEM,
        columName: 'tx_novo_teste',
        operator: 'avg',
        mes_anterior: params.periodo.anterior,
        mes_atual: params.periodo.atual,
      })} as variacao_novo_teste
    FROM hackathona.vw_testagem AS Testagem
    LEFT JOIN hackathona.dim_ubs Ubs 
    ON Ubs.pk_ubs_cnes = Testagem.pk_ubs_cnes
    ${nativeWhere(params, 'Testagem')}
    GROUP BY
      Testagem.ds_regiao,
      Ubs.pk_ubs_cnes,
      Ubs.nm_estabelecimento,
      Ubs.co_lat,
      Ubs.co_lon
  `.trim();
};