import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { fn, col, literal, QueryTypes } from 'sequelize';
import RequestFilter from '../types/RequestFilters';
import { sequelizeWhere } from '../utils/where-builder';
import { UpdateObitoDto } from './dto/update-obito.dto';
import { Obito } from './obito.model';
import * as NativeQueries from '../utils/native-queries';
import { preparaParametrosMes } from '../utils/date';
import { groupByRegiao } from './mapper/DadosObitosPorRegiao';

const modelFields = [
  'pk_ubs_cnes',
  'tp_estabelecimento', 
  "ds_regiao", 
  "nm_estabelecimento", 
  "ds_endereco", 
  "ds_complemento", 
  "nu_numero", 
  "ds_regiao_administrativa", 
  "ds_mes", 
  "ds_vacinados", 
  "ds_comorbidades", 
  "tx_letalidade", 
  "tx_mortalidade", 
  "tx_obitos",
  "qt_total_obitos", 
  "qt_novos_obitos"
];

@Injectable()
export class ObitoService {
  constructor(
    @InjectModel(Obito)
    private readonly model: typeof Obito,
  ) {}

  async create(createObitoDto: any) {
    return await this.model.create({ ...createObitoDto });
  }

  async findAll(param: RequestFilter) {
    const { periodo } = await preparaParametrosMes(param, this.model);

    return this.model.findAll({ 
      where: sequelizeWhere({...param, ...periodo.atual }),
      attributes: {
        exclude: modelFields,
        include: [
          [fn('sum', col('qt_total_obitos')), 'qt_total_obito'],
          [fn('sum', col('qt_novos_obitos')), 'qt_novos_obito'],
        ],
      },
    })
  }

  async findQtTxObitos(param: RequestFilter) {
    const { periodo } = await preparaParametrosMes(param, this.model);

    return this.model.findAll({ 
      where: sequelizeWhere({
        ...param,
        ...periodo.atual,
      }),
      attributes: {
        exclude: modelFields,
        include: [
          [fn('sum', col('qt_total_obitos')), 'qt_total_obitos'],
          [fn('sum', col('qt_novos_obitos')), 'qt_novos_obitos'],
          [fn('avg', col('tx_letalidade')), 'tx_letalidade'],
          [fn('avg', col('tx_mortalidade')), 'tx_mortalidade'],
          [
            literal(
              NativeQueries.VARIACAO({
                tableName: 'vw_obitos',
                columName: 'qt_total_obitos',
                mes_anterior: periodo.anterior,
                mes_atual: periodo.atual,
              }),
            ),
            'variacao_total_obitos',
          ],
          [
            literal(
              NativeQueries.VARIACAO({
                tableName: 'vw_obitos',
                columName: 'qt_novos_obitos',
                mes_anterior: periodo.anterior,
                mes_atual: periodo.atual,
              }),
            ),
            'variacao_novos_obitos',
          ],
          [
            literal(
              NativeQueries.OBITOS_VACINADOS({...param, ...periodo.atual}),
            ),
            'receberam_vacina',
          ],
          [
            literal(
              NativeQueries.OBITOS_NAO_VACINADOS({...param, ...periodo.atual}),
            ),
            'nao_receberam_vacina',
          ],
          [
            literal(
              NativeQueries.COMORBIDADE_DOENCA_RESPIRATORIA({...param, ...periodo.atual}),
            ),
            'doenca_respiratoria',
          ],
          [
            literal(
              NativeQueries.COMORBIDADE_DOENCA_CARDIACA({...param, ...periodo.atual}),
            ),
            'doenca_cardiaca',
          ],
          [
            literal(
              NativeQueries.COMORBIDADE_IMUNOSSUPRIMIDOS({...param, ...periodo.atual}),
            ),
            'imunossuprimidos',
          ],
          [
            literal(
              NativeQueries.COMORBIDADE_DIABETICOS({...param, ...periodo.atual}),
            ),
            'diabeticos',
          ],
        ],
      },
    })
  }

  async findDadosPorRegiao(params: RequestFilter = {}) {
    const { periodo } = await preparaParametrosMes(params, this.model);

    const data = await this.model.sequelize.query(
      NativeQueries.DADOS_OBITOS_POR_REGIAO({
        ...params, periodo,
      }),
      {
        type: QueryTypes.SELECT
      },
    )

    return groupByRegiao({ data });
  }

  async findNovosObitosPorDia(params: RequestFilter) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        ['ds_mes', 'data'],
        [
          fn('coalesce', fn('sum', col('qt_novos_obitos')), 0),
          'valor',
        ],
      ],
      group: 'ds_mes',
    });
  }

  async findTotalObitosPorDia(params: RequestFilter) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        ['ds_mes', 'data'],
        [
          fn('coalesce', fn('sum', col('qt_total_obitos')), 0),
          'valor',
        ],
      ],
      group: 'ds_mes',
    });
  }

  async findOne(id: number) {
    return await this.model.findOne({ where: { id } });
  }

  async update(id: number, updateObitoDto: UpdateObitoDto) {
    return await this.model.update(
      { ...updateObitoDto },
      { where: { id } },
    );
  }

  remove(id: number) {
    this.model.destroy({ where: { id } });
  }
}
