import { InjectModel } from '@nestjs/sequelize';
import { fn, literal, col, QueryTypes } from 'sequelize';
import RequestFilter from '../types/RequestFilters';
import { sequelizeWhere } from '../utils/where-builder';
import { CreateTestagemDto } from './dto/create-testagem.dto';
import { UpdateTestagemDto } from './dto/update-testagem.dto';
import { Testagem } from './testagem.model';
import * as NativeQueries from '../utils/native-queries';
import { preparaParametrosMes } from '../utils/date';
import { groupByRegiao } from './mapper/DadosTestagemPorRegiao';
import { pivotTipoTeste } from './mapper/DadosTestagemPorTipoTeste';

export class TestagemService {
  constructor(@InjectModel(Testagem) private readonly model: typeof Testagem) {}

  create(createTestagemDto: CreateTestagemDto) {
    return 'This action adds a new testagem';
  }

  async findAll(param: RequestFilter) {
    const { periodo } = await preparaParametrosMes(param, this.model);

    return this.model.findAll({ 
      where: sequelizeWhere({...param, ...periodo.atual }),
      attributes: {
        exclude: [
          'pk_ubs_cnes',
          'tp_estabelecimento', 
          "ds_regiao", 
          "ds_endereco", 
          "ds_complemento", 
          "nu_numero", 
          "ds_regiao_administrativa", 
          "ds_mes", 
          "tp_teste", 
          "qt_testes_realizados", 
          "tx_negativos", 
          "tx_positivos", 
          "tx_com_sintomas",
          "tx_sem_sintomas", 
          "tx_novo_teste"
        ],
        include: [
          [fn('sum', col('qt_testes_realizados')), 'qt_testes_realizados'],
          [fn('avg', col('tx_negativos')), 'tx_negativos'],
          [fn('avg', col('tx_positivos')), 'tx_positivos'],
          [fn('avg', col('tx_com_sintomas')), 'tx_com_sintomas'],
          [fn('avg', col('tx_sem_sintomas')), 'tx_sem_sintomas'],
          [fn('avg', col('tx_novo_teste')), 'tx_novo_teste'],
          [
            literal(
              NativeQueries.VARIACAO({
                tableName: 'vw_testagem',
                columName: 'qt_testes_realizados',
                mes_anterior: periodo.anterior,
                mes_atual: periodo.atual,
              }),
            ),
            'variacao_testes_realizados',
          ],
          [
            literal(
              NativeQueries.VARIACAO({
                tableName: 'vw_testagem',
                columName: 'tx_com_sintomas',
                mes_anterior: periodo.anterior,
                mes_atual: periodo.atual,
              }),
            ),
            'variacao_com_sintomas',
          ],
          [
            literal(
              NativeQueries.VARIACAO({
                tableName: 'vw_testagem',
                columName: 'tx_sem_sintomas',
                mes_anterior: periodo.anterior,
                mes_atual: periodo.atual,
              }),
            ),
            'variacao_sem_sintomas',
          ],
          [
            literal(
              NativeQueries.VARIACAO({
                tableName: 'vw_testagem',
                columName: 'tx_novo_teste',
                mes_anterior: periodo.anterior,
                mes_atual: periodo.atual,
              }),
            ),
            'variacao_novo_teste',
          ],
        ]
      }
    })
  }

  findOne(id: number) {
    return this.model.findByPk(id);
  }

  update(id: number, updateTestagemDto: UpdateTestagemDto) {
    return `This action updates a #${id} testagem`;
  }

  remove(id: number) {
    return `This action removes a #${id} testagem`;
  }

  async findDadosPorRegiao(params: RequestFilter = {}) {
    const { periodo } = await preparaParametrosMes(params, this.model);

    const data = await this.model.sequelize.query(
      NativeQueries.DADOS_TESTAGEM_POR_REGIAO({
        ...params, periodo
      }),
      {
        type: QueryTypes.SELECT
      },
    );

    return groupByRegiao({ data });
  }

  async findTestesRealizadosPorDia(params: RequestFilter) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        ['ds_mes', 'data'],
        [
          fn('coalesce', fn('sum', col('qt_testes_realizados')), 0),
          'valor',
        ],
      ],
      group: 'ds_mes',
    });
  }

  async findComSintomasPorDia(params: RequestFilter) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        ['ds_mes', 'data'],
        [
          fn('coalesce', fn('sum', col('tx_com_sintomas')), 0),
          'valor',
        ],
      ],
      group: 'ds_mes',
    });
  }

  async findSemSintomasPorDia(params: RequestFilter) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        ['ds_mes', 'data'],
        [
          fn('coalesce', fn('sum', col('tx_sem_sintomas')), 0),
          'valor',
        ],
      ],
      group: 'ds_mes',
    });
  }

  async findNovosTestesPorDia(params: RequestFilter) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        ['ds_mes', 'data'],
        [
          fn('coalesce', fn('sum', col('tx_novo_teste')), 0),
          'valor',
        ],
      ],
      group: 'ds_mes',
    });
  }

  async findEvolucaoTestesPorMes(params: RequestFilter) {
    const data = await this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        [fn('to_char', col('ds_mes'), 'YYYY-MM'), 'mes'],
        ['tp_teste', 'tipo_teste'],
        [fn('sum', col('qt_testes_realizados')), 'quantidade']
      ],
      group: [fn('to_char', col('ds_mes'), 'YYYY-MM'), 'tp_teste'],
      order: [[fn('to_char', col('ds_mes'), 'YYYY-MM'), 'ASC']]
    });

    return pivotTipoTeste({ data });
  }
}
