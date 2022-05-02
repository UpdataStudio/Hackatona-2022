import { Op } from 'sequelize';
import RequestFilter from '../types/RequestFilters';
import VacinaFilters from '../types/VacinaFilters';

export const nativeWhere = (params: RequestFilter & VacinaFilters, alias?: string) => {
  const entityAlias = alias ? `${alias}.` : '';
  let where = ' WHERE 1=1';

  if (params.inicio && params.fim) {
    where += ` AND ${entityAlias}ds_mes BETWEEN '${params.inicio}' AND '${params.fim}'`;
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
  if (params.regiao_saude) {
    where += ` AND ${entityAlias}ds_regiao = '${params.regiao_saude}'`;
  }
  if (params.acima_12_anos) {
    where += ` AND ${entityAlias}ds_acima_12_anos = '${params.acima_12_anos}'`;
  }
  if (params.fabricante) {
    where += ` AND ${entityAlias}ds_fabricante = '${params.fabricante}'`;
  }

  return where;
};

export const sequelizeWhere = (params: RequestFilter) => {
  let where = {};

  if (params.inicio && params.fim) {
    where = {
      ds_mes: { 
        [Op.between]: [params.inicio, params.fim]
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
  if (params.regiao_saude) {
    where = { ...where, ds_regiao: params.regiao_saude };
  }

  return where;
};
