import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { col, fn, literal, QueryTypes } from 'sequelize';
import { Vacinas } from './vacinas.model';
import * as NativeQueries from '../utils/native-queries';
import VacinaFilters, { where } from '../types/VacinaFilters';
import { groupByRegiao } from './mapper/DadosVacinaPorRegiao';

@Injectable()
export class VacinasService {
  constructor(
    @InjectModel(Vacinas) private readonly model: typeof Vacinas,
  ) {}

  async create(data) {
    this.model.create(data);
  }

  async findAll() {
    return await this.model.findAll();
  }

  findDoses(params: VacinaFilters = {}) {
    return this.model.findAll({
      where: where(params),
      attributes: [
        ['ds_dose', 'label'],
        [literal('avg(tx_dose) * 100'), 'porcentagem'],
        [fn('sum', col('qt_aplicada')), 'value'],
      ],
      group: 'ds_dose',
    });
  }

  findEstoque(params: VacinaFilters = {}) {
    return this.model.findAll({
      where: where(params),
      attributes: [
        'ds_dose',
        [fn('sum', col('qt_estoque')), 'quantidade_estoque'],
        [fn('sum', col('qt_aplicada')), 'quantidade_aplicada'],
        [literal(NativeQueries.PERCENTUAL_ESTOQUE_VS_APLICADA), 'porcentagem_estoque'],
        [literal(NativeQueries.PERCENTUAL_APLICADA_VS_ESTOQUE), 'porcentagem_aplicada'],
      ],
      group: 'ds_dose',
    });
  }

  async findDataByRegiao(params: VacinaFilters = {}) {
    const data = await this.model.sequelize.query(
      NativeQueries.DADOS_VACINA_POR_REGIAO(params),
      {
        type: QueryTypes.SELECT
      },
    )

    return groupByRegiao({ data });
  }

  async filters() {
    const fabricante = await this.model.findAll({
      group: 'ds_fabricante',
      attributes: [
        ['ds_fabricante', 'label'],
        ['ds_fabricante', 'value'],
      ],
    });

    return { fabricante };
  }
}
