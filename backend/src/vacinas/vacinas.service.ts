import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { QueryTypes } from 'sequelize';
import { sequelizeWhere } from 'src/utils/where-builder';
import RequestFilters from 'src/types/RequestFilters';
import { Vacinas } from './vacinas.model';
import * as NativeQueries from '../utils/native-queries';

@Injectable()
export class VacinasService {
  constructor(@InjectModel(Vacinas) private readonly model: typeof Vacinas) {}

  async findAll() {
    return await this.model.findAll();
  }

  findDoses(params: RequestFilters = {}) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        'ds_dose',
        [sequelize.fn('avg', sequelize.col('tx_dose')), 'percentual'],
        [
          sequelize.fn('avg', sequelize.col('qt_aplicada')),
          'quantidade_aplicada',
        ],
      ],
      group: 'ds_dose',
    });
  }

  findEstoque(params: RequestFilters = {}) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        'ds_dose',
        [
          sequelize.fn('sum', sequelize.col('qt_estoque')),
          'quantidade_estoque',
        ],
        [
          sequelize.fn('sum', sequelize.col('qt_aplicada')),
          'quantidade_aplicada',
        ],
      ],
      group: 'ds_dose',
    });
  }

  findDataByRegiao(params: RequestFilters = {}) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        [
          sequelize.fn('sum', sequelize.col('qt_estoque')),
          'quantidade_estoque',
        ],
        [
          sequelize.fn('sum', sequelize.col('qt_aplicada')),
          'quantidade_aplicada',
        ],
        'ds_regiao_administrativa',
      ],
      group: 'ds_regiao_administrativa',
    });
  }

  async filters() {
    const regiao = await this.model.findAll({
      group: 'ds_regiao_administrativa',
      attributes: [
        ['ds_regiao_administrativa', 'label'],
        ['ds_regiao_administrativa', 'value'],
      ],
    });

    const ubs = await this.model.findAll({
      group: 'nm_estabelecimento',
      attributes: [
        ['nm_estabelecimento', 'label'],
        ['nm_estabelecimento', 'value'],
      ],
    });

    const bairro = await this.model.sequelize.query(
      NativeQueries.FILTRO_BAIRRO('vw_vacinas'),
      {
        type: QueryTypes.SELECT,
      },
    );

    const mes = await this.model.findAll({
      group: 'ds_mes',
      attributes: [
        ['ds_mes', 'label'],
        ['ds_mes', 'value'],
      ],
    });

    return { regiao, ubs, bairro, mes };
  }
}
