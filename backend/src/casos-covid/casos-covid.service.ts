import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { fn, col, literal, Op, QueryTypes } from 'sequelize';
import RequestFilters from 'src/types/RequestFilters';
import { CasosCovid } from './casos-covid.model';
import { CreateCasosCovidDto } from './dto/create-casos-covid.dto';
import { UpdateCasosCovidDto } from './dto/update-casos-covid.dto';
import { decrementaMes } from '../utils/date';
import * as NativeQueries from '../utils/native-queries';
import { sequelizeWhere } from '../utils/where-builder';

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
  ) {}

  async create(createCasosCovidDto: CreateCasosCovidDto) {
    return await this.model.create({ ...createCasosCovidDto });
  }

  async findAll() {
    return await this.model.findAll();
  }

  async findNovosCasos(params: RequestFilters = {}) {
    const { mesRecente, mesAnterior } = await this._preparaFiltroMes(params);

    return this.model.findAll({
      where: sequelizeWhere({ ...params, inicio: mesRecente, fim: mesRecente }),
      attributes: {
        exclude: modelFields,
        include: [
          [fn('coalesce', fn('sum', col('qt_novos_casos')), 0), 'novos_casos'],
          [
            literal(
              NativeQueries.NOVOS_CASOS({ ...params, inicio: mesAnterior, fim: mesAnterior }),
            ),
            'casos_mes_anterior',
          ],
          [
            literal(
              NativeQueries.VARIACAO_NOVOS_CASOS({
                ...params,
                mes_anterior: mesAnterior,
                mes_atual: mesRecente,
              }),
            ),
            'percentual_variacao',
          ],
        ],
      },
    });
  }

  async findNovosCasosPorMes(params: RequestFilters) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        [
          fn('coalesce', fn('sum', col('qt_novos_casos')), 0),
          'quantidade_novos_casos',
        ],
        'ds_mes',
      ],
      group: 'ds_mes',
    });
  }

  async findTotalCasos(params: RequestFilters) {
    const { mesRecente, mesAnterior } = await this._preparaFiltroMes(params);

    return this.model.findAll({
      where: sequelizeWhere({ ...params, inicio: mesRecente, fim: mesRecente }),
      attributes: {
        exclude: modelFields,
        include: [
          [fn('sum', col('qt_total_casos')), 'total_casos'],
          [
            literal(NativeQueries.TOTAL_CASOS({ ds_mes: mesRecente })),
            'casos_mes_anterior',
          ],
          [
            literal(
              NativeQueries.VARIACAO_TOTAL_CASOS({
                mes_anterior: mesAnterior,
                mes_atual: mesRecente,
              }),
            ),
            'percentual_variacao',
          ],
        ],
      },
    });
  }

  async findTotalCasosPorMes(params: RequestFilters) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        [
          fn('coalesce', fn('sum', col('qt_total_casos')), 0),
          'quantidade_total_casos',
        ],
        'ds_mes',
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
          'quantidade_total_casos',
        ],
        ['ds_casos', 'situacao'],
      ],
      group: 'ds_casos',
    });
  }

  async findPacientesPorSintomas(params: RequestFilters) {
    const { mesRecente, mesAnterior } = await this._preparaFiltroMes(params);

    return this.model.findAll({
      where: sequelizeWhere({ ...params, inicio: mesRecente, fim: mesRecente }),
      attributes: {
        exclude: modelFields,
        include: [
          [fn('avg', col('tx_sintomas_leves')), 'media_sintomas_leves'],
          [fn('avg', col('tx_sintomas_graves')), 'media_sintomas_graves'],
          [fn('avg', col('tx_assintomaticos')), 'media_assintomaticos'],
          [
            literal(
              NativeQueries.VARIACAO_CASOS_SINTOMAS_LEVES({
                mes_anterior: mesAnterior,
                mes_atual: mesRecente,
              }),
            ),
            'variacao_sintomas_leves',
          ],
          [
            literal(
              NativeQueries.VARIACAO_CASOS_SINTOMAS_GRAVES({
                mes_anterior: mesAnterior,
                mes_atual: mesRecente,
              }),
            ),
            'variacao_sintomas_graves',
          ],
          [
            literal(
              NativeQueries.VARIACAO_CASOS_ASSINTOMATICOS({
                mes_anterior: mesAnterior,
                mes_atual: mesRecente,
              }),
            ),
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
        [fn('avg', col('tx_homens')), 'percentual_homens'],
        [fn('avg', col('tx_mulheres')), 'percentual_mulheres'],
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
    const { mesRecente, mesAnterior } = await this._preparaFiltroMes(params);
    return this.model.findAll({
      where: sequelizeWhere({ ...params, inicio: mesRecente, fim: mesRecente }),
      attributes: [
        [
          literal(
            NativeQueries.CONFIRMADOS_EM_ACOMPANHAMENTO({
              inicio: mesRecente, fim: mesRecente,
            }),
          ),
          'media_em_acompanhamento',
        ],
        [
          literal(
            NativeQueries.VARIACAO_CONFIRMADOS_EM_ACOMPANHAMENTO({
              mes_atual: mesRecente,
              mes_anterior: mesAnterior,
            }),
          ),
          'variacao',
        ],
      ],
    });
  }

  async findConfirmadosInternados(params: RequestFilters) {
    const { mesRecente, mesAnterior } = await this._preparaFiltroMes(params);

    return this.model.findAll({
      where: sequelizeWhere({ ...params, inicio: mesRecente, fim: mesRecente }),
      attributes: [
        [
          literal(
            NativeQueries.CONFIRMADOS_INTERNADOS({
              inicio: mesRecente,
              fim: mesRecente,
            }),
          ),
          'media_internados',
        ],
        [
          literal(
            NativeQueries.VARIACAO_CONFIRMADOS_INTERNADOS({
              mes_atual: mesRecente,
              mes_anterior: mesAnterior,
            }),
          ),
          'variacao',
        ],
      ],
    });
  }

  async findVacinacao(params: RequestFilters) {
    return this.model.findAll({
      where: { ...sequelizeWhere(params), ds_vacinados: 'Sim' },
      attributes: [
        [
          fn('avg', col('tx_vacinados_em_acompanhamento')),
          'vacinados_em_acompanhamento',
        ],
        [fn('avg', col('tx_vacinados_internados')), 'vacinados_internados'],
        [fn('avg', col('tx_vacinados_confirmados')), 'vacinados_confirmados'],
      ],
    });
  }

  async findMediasComorbidades(params: RequestFilters) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        [
          fn('avg', col('tx_comorbidades_em_acompanhamento')),
          'comorbidades_em_acompanhamento',
        ],
        [
          fn('avg', col('tx_comorbidades_internados')),
          'comorbidades_internados',
        ],
        [
          fn('avg', col('tx_comorbidades_confirmados')),
          'comorbidades_confirmados',
        ],
      ],
    });
  }

  async findConfirmadosComComorbidades(params: RequestFilters) {
    return this.model.findAll({
      where: {
        ...sequelizeWhere(params),
        ds_comorbidades: { [Op.not]: null },
      },
      attributes: [
        [fn('avg', col('tx_comorbidades_confirmados')), 'percentual'],
        ['ds_comorbidades', 'comorbidade'],
      ],
      group: 'ds_comorbidades',
    });
  }

  async findConfirmadosEmAcompanhamentoPorMes(params: RequestFilters) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        [
          literal(
            NativeQueries.CONFIRMADOS_EM_ACOMPANHAMENTO(),
          ),
          'media_em_acompanhamento',
        ],
        ['ds_mes', 'mes'],
      ],
      group: 'ds_mes',
    });
  }

  async findConfirmadosInternadosPorMes(params: RequestFilters) {
    return this.model.findAll({
      where: sequelizeWhere(params),
      attributes: [
        [
          literal(NativeQueries.CONFIRMADOS_INTERNADOS()),
          'media_internados',
        ],
        ['ds_mes', 'mes'],
      ],
      group: 'ds_mes',
    });
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

  async _preparaFiltroMes(params) {
    let mesRecente = params.inicio;
    if (!mesRecente) {
      mesRecente = await this.model.max('ds_mes');
    }
    const mesAnterior = params.fim || decrementaMes(mesRecente);

    return { mesRecente, mesAnterior };
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
