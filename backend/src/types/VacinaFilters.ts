import { sequelizeWhere } from "../utils/where-builder";
import RequestFilter from "./RequestFilters";

export default class VacinaFilters extends RequestFilter {
  fabricante?: string;
  acima_12_anos?: 'Sim' | 'Não';
}

export const where = (params: VacinaFilters) => {
  let where = sequelizeWhere(params);

  if (params.fabricante) {
    where = {...where, ds_fabricante: params.fabricante };
  }
  if (params.acima_12_anos) {
    where = {...where, ds_acima_12_anos: params.acima_12_anos };
  }

  return where;
}