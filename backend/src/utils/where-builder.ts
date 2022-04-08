import { fn, col, literal, Op } from 'sequelize';
import RequestFilter from 'src/types/RequestFilters';

export const nativeWhere = (params: RequestFilter, alias: string) => {
  const entityAlias = alias ? `${alias}.` : '';
  let where = ' WHERE 1=1';

  if (params.inicio && params.fim) {
    const [anoInicio, mesInicio] = params.inicio.split('-');
    const [anoFim, mesFim] = params.inicio.split('-');
    const inicio = `${anoInicio}-${mesInicio}`;
    const fim = `${anoFim}-${mesFim}`;

    where += ` AND ${entityAlias}ds_mes BETWEEN '${inicio}' AND '${fim}'`;
  }
  if (params.bairro) {
    where += ` AND ${entityAlias}nm_estabelecimento like '%${params.bairro}%'`;
  }
  if (params.ubs) {
    where += ` AND ${entityAlias}nm_estabelecimento = '${params.ubs}'`;
  }
  if (params.regiao_administrativa) {
    where += ` AND ${entityAlias}ds_regiao_administrativa = '${params.regiao_administrativa}'`;
  }

  return where;
};

export const sequelizeWhere = (params: RequestFilter) => {
  let where = {};

  if (params.inicio && params.fim) {
    const [anoInicio, mesInicio] = params.inicio.split('-');
    const [anoFim, mesFim] = params.inicio.split('-');
    const inicio = `${anoInicio}-${mesInicio}`;
    const fim = `${anoFim}-${mesFim}`;

    where = {
      ds_mes: { 
        [Op.between]: [inicio, fim]
      },
    };
  }
  if (params.bairro) {
    where = {
      ...where,
      nm_estabelecimento: { [Op.like]: `%${params.bairro}%` },
    };
  }
  if (params.ubs) {
    where = { ...where, nm_estabelecimento: params.ubs };
  }
  if (params.regiao_administrativa) {
    where = {
      ...where,
      ds_regiao_administrativa: params.regiao_administrativa,
    };
  }

  return where;
};
