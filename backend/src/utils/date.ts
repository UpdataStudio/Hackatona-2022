import RequestFilter from "../types/RequestFilters";

export async function preparaFiltroMes(params: RequestFilter, model) {
  let mesRecente = params.fim;
  if (!mesRecente) {
    mesRecente = await model.max('ds_mes');
  }
  const mesAnterior = params.inicio || decrementaMes(mesRecente);

  return { mesRecente, mesAnterior };
}

export async function preparaParametrosMes(params: RequestFilter, model) {
  let dataMaisRecente = params.fim;
  if (!dataMaisRecente) {
    dataMaisRecente = await model.max('ds_mes');
  }  
  const dataAnterior = params.inicio || decrementaMes(dataMaisRecente);

  return { 
    periodo: { 
      anterior: {
        inicio: decrementaMes(dataAnterior),
        fim: decrementaMes(dataMaisRecente)
      },
      atual: {
        inicio: dataAnterior,
        fim: dataMaisRecente,
      },
    },
  };
}

/** A data chega no formato 'YYYY-MM-DD' */
export function decrementaMes(data: string) {
  const [ano, mes, dia] = data ? data.split('-') : [];

  if (!mes || !ano) {
    return null;
  }
  const mesAsNumber = parseInt(mes, 10);
  const anoAsNumber = parseInt(ano, 10);

  const MES_JANEIRO = '01';
  const MES_DEZEMBRO = '12';

  const mesAnterior =
    mes === MES_JANEIRO
      ? `${anoAsNumber - 1}-${MES_DEZEMBRO}-${dia}`
      : `${ano}-${String(mesAsNumber - 1).padStart(2, '0')}-${dia}`;

  return mesAnterior;
};
