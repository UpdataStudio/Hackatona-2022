import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { fn, col, literal, Op, QueryTypes } from 'sequelize';
import RequestFilters from '../types/RequestFilters';
import { CasosCovid } from './casos-covid.model';
import { CreateCasosCovidDto } from './dto/create-casos-covid.dto';
import { UpdateCasosCovidDto } from './dto/update-casos-covid.dto';
import { preparaParametrosMes } from '../utils/date';
import * as NativeQueries from '../utils/native-queries';
import { sequelizeWhere } from '../utils/where-builder';
import { Ubs } from '../ubs/ubs.model';
import { groupByRegiao } from './mapper/DadosCasosPorRegiao';

const modelFields: string[] = [
  'pk_ubs_cnes',
  'ds_regiao',
  'tp_estabelecimento',
  'nm_estabelecimento',
  'ds_endereco',
  'ds_complemento',
  'nu_numero',
  'ds_regiao_administrativa',
  'ds_mes',
  'ds_casos',
  'ds_faixa_etaria',
  'qt_total_casos',
  'qt_novos_casos',
  'tx_sintomas_leves',
  'tx_sintomas_graves',
  'tx_assintomaticos',
  'tx_homens',
  'tx_mulheres',
];
@Injectable()
export class CasosCovidService {
  constructor(
    @InjectModel(CasosCovid)
    private readonly model: typeof CasosCovid,
    @InjectModel(Ubs)
    private readonly ubsModel: typeof Ubs,
  ) {}

  async create(createCasosCovidDto: CreateCasosCovidDto) {
    return await this.model.create({ ...createCasosCovidDto });
  }

  async findAll() {
    return await this.model.findAll();
  }

  async findNovosCasos(params: RequestFilters = {}) {
    const { periodo } = await preparaParametrosMes(params, this.model);

    return this.model.findOne({
      where: sequelizeWhere({ ...params, ...periodo.atual }),
      attributes: {
        exclude: modelFields,
        include: [
          [fn('coalesce', fn('sum', col('qt_novos_casos')), 0), 'valor'],
          [
            literal(
              NativeQueries.VARIACAO({
                tableName: 'vw_casos_covid',
                columName: 'qt_novos_casos',
                mes_anterior: periodo.anterior,
                mes_atual: periodo.atual,
              }),
            ),
            'percentual_variacao',
          ],
        ],
      },
    });
  }

  async findNovosCasosPorDia(params: RequestFilters) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        ['ds_mes', 'data'],
        [
          fn('coalesce', fn('sum', col('qt_novos_casos')), 0),
          'valor',
        ],
      ],
      group: 'ds_mes',
    });
  }

  async findTotalCasos(params: RequestFilters) {
    const { periodo } = await preparaParametrosMes(params, this.model);

    return this.model.findOne({
      where: sequelizeWhere({ ...params, ...periodo.atual }),
      attributes: {
        exclude: modelFields,
        include: [
          [fn('sum', col('qt_total_casos')), 'valor'],
          [
            literal(
              NativeQueries.VARIACAO({
                tableName: 'vw_casos_covid',
                columName: 'qt_total_casos',
                mes_anterior: periodo.anterior,
                mes_atual: periodo.atual,
              }),
            ),
            'percentual_variacao',
          ],
        ],
      },
    });
  }

  async findTotalCasosPorDia(params: RequestFilters) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        ['ds_mes', 'data'],
        [
          fn('coalesce', fn('sum', col('qt_total_casos')), 0),
          'valor',
        ],
      ],
      group: 'ds_mes',
    });
  }

  async findBySituacaoPaciente(params: RequestFilters) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        [
          fn('coalesce', fn('sum', col('qt_total_casos')), 0),
          'valor',
        ],
        [
          literal(NativeQueries.PERCENTUAL_SITUACAO_PACIENTE(params)),
          'percentual',
        ],
        ['ds_casos', 'situacao'],
      ],
      group: 'ds_casos',
    });
  }

  async findPacientesPorSintomas(params: RequestFilters) {
    const { periodo } = await preparaParametrosMes(params, this.model);

    return this.model.findOne({
      where: sequelizeWhere({ ...params, ...periodo.atual }),
      attributes: {
        exclude: modelFields,
        include: [
          [literal('(avg(tx_sintomas_leves) * 100)'), 'media_sintomas_leves'],
          [literal('(avg(tx_sintomas_graves) * 100)'), 'media_sintomas_graves'],
          [literal('(avg(tx_assintomaticos) * 100)'), 'media_assintomaticos'],
          [
            literal(
              NativeQueries.VARIACAO({
                tableName: 'vw_casos_covid',
                columName: 'tx_sintomas_leves',
                operator: 'avg',
                mes_anterior: periodo.anterior,
                mes_atual: periodo.atual,
              }),
            ),
            'variacao_sintomas_leves',
          ],
          [
            NativeQueries.VARIACAO({
              tableName: 'vw_casos_covid',
              columName: 'tx_sintomas_graves',
              operator: 'avg',
              mes_anterior: periodo.anterior,
              mes_atual: periodo.atual,
            }),
            'variacao_sintomas_graves',
          ],
          [
            NativeQueries.VARIACAO({
              tableName: 'vw_casos_covid',
              columName: 'tx_assintomaticos',
              operator: 'avg',
              mes_anterior: periodo.anterior,
              mes_atual: periodo.atual,
            }),
            'variacao_assintomaticos',
          ],
        ],
      },
    });
  }

  async findBySexo(params: RequestFilters) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        [literal('avg(tx_homens) * 100'), 'percentual_homens'],
        [literal('avg(tx_mulheres) * 100'), 'percentual_mulheres'],
        [fn('sum', col('tx_homens')), 'total_homens'], //TODO Adicionar uma coluna para quantidade (Rafael)
        [fn('sum', col('tx_mulheres')), 'total_mulheres'], //TODO Adicionar uma coluna para quantidade (Rafael)
      ],
    });
  }

  async findByFaixaEtaria(params: RequestFilters) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        ['ds_faixa_etaria', 'faixa_etaria'],
        [fn('sum', col('qt_total_casos')), 'total_casos'],
      ],
      group: 'ds_faixa_etaria',
    });
  }

  async findConfirmadosEmAcompanhamento(params: RequestFilters) {
    const { periodo } = await preparaParametrosMes(params, this.model);
    return this.model.findOne({
      where: sequelizeWhere({ ...params, ...periodo.atual }),
      attributes: [
        [
          literal(
            NativeQueries.CONFIRMADOS_EM_ACOMPANHAMENTO({...periodo.atual}),
          ),
          'media_em_acompanhamento',
        ],
        [
          literal(
            NativeQueries.VARIACAO_CONFIRMADOS_EM_ACOMPANHAMENTO({
              mes_atual: periodo.atual,
              mes_anterior: periodo.anterior,
            }),
          ),
          'variacao',
        ],
      ],
    });
  }

  async findConfirmadosInternados(params: RequestFilters) {
    const { periodo } = await preparaParametrosMes(params, this.model);

    return this.model.findOne({
      where: sequelizeWhere({ ...params, ...periodo.atual }),
      attributes: [
        [
          literal(
            NativeQueries.CONFIRMADOS_INTERNADOS({
              ...periodo.atual
            }),
          ),
          'media_internados',
        ],
        [
          literal(
            NativeQueries.VARIACAO_CONFIRMADOS_INTERNADOS({
              mes_atual: periodo.atual,
              mes_anterior: periodo.anterior,
            }),
          ),
          'variacao',
        ],
      ],
    });
  }

  async findVacinacao(params: RequestFilters) {
    const data = await this.model.findAll({
      where: { ...sequelizeWhere(params), ds_vacinados: 'Sim' },
      attributes: [
        [literal('avg(tx_vacinados_em_acompanhamento) * 100'), 'vacinados_em_acompanhamento'],
        [literal('avg(tx_vacinados_internados) * 100'), 'vacinados_internados'],
        [literal('avg(tx_vacinados_confirmados) * 100'), 'vacinados_confirmados'],
      ],
    });
    const mappingLabels = {
      'vacinados_em_acompanhamento': 'Em acompanhamento Vacinados',
      'vacinados_internados': 'Internados Vacinados',
      'vacinados_confirmados': 'Confirmados Vacinados',
    };
    const keys = [
      'vacinados_em_acompanhamento',
      'vacinados_internados',
      'vacinados_confirmados'
    ];
    
    return data.reduce((prev, current) => {
      const items = keys.map(key => ({
        label: mappingLabels[key],
        porcentagem: current.toJSON()[key]
      }));

      return [...prev, ...items];
    }, []);
  }

  async findMediasComorbidades(params: RequestFilters) {
    const data = await this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        [
          literal('avg(tx_comorbidades_em_acompanhamento) * 100'),
          'comorbidades_em_acompanhamento',
        ],
        [
          literal('avg(tx_comorbidades_internados) * 100'),
          'comorbidades_internados',
        ],
        [
          literal('avg(tx_comorbidades_confirmados) * 100'),
          'comorbidades_confirmados',
        ],
      ],
    });
    const mappingLabels = {
      'comorbidades_em_acompanhamento': 'Em acompanhamento com Comorbidades',
      'comorbidades_internados': 'Internados com Comorbidades',
      'comorbidades_confirmados': 'Confirmados com Comorbidades',
    };
    const keys = [
      'comorbidades_em_acompanhamento',
      'comorbidades_internados',
      'comorbidades_confirmados'
    ];
    
    return data.reduce((prev, current) => {
      const items = keys.map(key => ({
        label: mappingLabels[key],
        porcentagem: current.toJSON()[key]
      }));

      return [...prev, ...items];
    }, []);
  }

  async findConfirmadosComComorbidades(params: RequestFilters) {
    return this.model.findAll({
      where: {
        ...sequelizeWhere(params),
        ds_comorbidades: { [Op.not]: null },
      },
      attributes: [
        [literal('avg(tx_comorbidades_confirmados) * 100'), 'percentual'],
        ['ds_comorbidades', 'comorbidade'],
      ],
      group: 'ds_comorbidades',
    });
  }

  async findConfirmadosEmAcompanhamentoPorDia(params: RequestFilters) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        [
          literal('(avg(tx_comorbidades_em_acompanhamento) + avg(tx_vacinados_em_acompanhamento)) * 100'),
          'media_em_acompanhamento',
        ],
        ['ds_mes', 'data'],
      ],
      group: 'ds_mes',
    });
  }

  async findConfirmadosInternadosPorDia(params: RequestFilters) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        [
          literal('(avg(tx_comorbidades_internados) + avg(tx_vacinados_internados)) * 100'),
          'media_internados',
        ],
        ['ds_mes', 'data'],
      ],
      group: 'ds_mes',
    });
  }

  async findDadosPorRegiao(params: RequestFilters = {}) {
    const { periodo } = await preparaParametrosMes(params, this.model);

    const data = await this.model.findAll({
      where: sequelizeWhere({ ...params, ...periodo.atual }),
      attributes: {
        exclude: modelFields,
        include: [
          ['ds_regiao', 'regiao'],
          [fn('coalesce', fn('sum', col('qt_novos_casos')), 0), 'novos_casos'],
          [fn('coalesce', fn('sum', col('qt_total_casos')), 0), 'total_casos'],
          [
            literal(
              NativeQueries.VARIACAO({
                tableName: 'vw_casos_covid',
                columName: 'qt_novos_casos',
                mes_anterior: periodo.anterior,
                mes_atual: periodo.atual,
              }),
            ),
            'variacao_novos_casos',
          ],
          [
            literal(
              NativeQueries.VARIACAO({
                tableName: 'vw_casos_covid',
                columName: 'qt_total_casos',
                mes_anterior: periodo.anterior,
                mes_atual: periodo.atual,
              }),
            ),
            'variacao_total_casos',
          ],
        ],
      },
      group: 'ds_regiao'
    });

    return groupByRegiao({ data, ubsModel: this.ubsModel });
  }

  async findTotalCasosPorDiaERegiao(params: RequestFilters) {
    const data = await this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        [
          fn('coalesce', fn('sum', col('qt_total_casos')), 0),
          'valor',
        ],
        ['ds_mes', 'data'],
        ['ds_regiao', 'regiao'],
      ],
      group: ['ds_mes', 'ds_regiao'],
    });
    
    return groupByRegiao({ data, ubsModel: this.ubsModel });
  }

  async findNovosCasosPorDiaERegiao(params: RequestFilters) {
    const data = await this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        [
          fn('coalesce', fn('sum', col('qt_novos_casos')), 0),
          'valor',
        ],
        ['ds_mes', 'data'],
        ['ds_regiao', 'regiao'],
      ],
      group: ['ds_mes', 'ds_regiao'],
    });
    
    return groupByRegiao({ data, ubsModel: this.ubsModel });
  }

  async findOne(id: number) {
    return await this.model.findOne({ where: { id } });
  }

  async update(id: number, updateCasosCovidDto: UpdateCasosCovidDto) {
    return await this.model.update(
      { ...updateCasosCovidDto },
      { where: { id } },
    );
  }

  remove(id: number) {
    this.model.destroy({ where: { id } });
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
      NativeQueries.FILTRO_BAIRRO('vw_casos_covid'),
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
