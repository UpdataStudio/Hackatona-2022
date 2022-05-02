import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RangesMapa } from './ranges-mapa.model';

@Injectable()
export class RangesMapaService {

  constructor(
    @InjectModel(RangesMapa) private model: typeof RangesMapa
  ) {}

  create(createRangesMapaDto) {
    return this.model.create(createRangesMapaDto);
  }

  async findAll() {
    const data = await this.model.findAll();
    const dadosPorAba = {};

    for (const item of data) {
      if (!dadosPorAba[item.no_aba]) {
        dadosPorAba[item.no_aba] = [];
      }
      const isPercentual = ['Vacina','Óbito'].includes(item.no_aba);

      dadosPorAba[item.no_aba].push({
        cor: item.co_cor,
        minimo: isPercentual ? item.vl_minimo * 100 : item.vl_minimo,
        maximo: isPercentual ? item.vl_maximo * 100 : item.vl_maximo,
      });
    }

    return dadosPorAba;
  }
}
