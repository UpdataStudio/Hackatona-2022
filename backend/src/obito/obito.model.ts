import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'vw_obitos',
  schema: 'hackathona',
  timestamps: false,
  underscored: true,
})
export class Obito extends Model {
  @PrimaryKey
  @Column
  pk_ubs_cnes: number;

  @Column
  ds_regiao: string;

  @Column
  tp_estabelecimento: string;

  @Column
  nm_estabelecimento: string;

  @Column
  ds_endereco: string;

  @Column
  ds_complemento: string;

  @Column
  nu_numero: string;

  @Column
  ds_regiao_administrativa: string;

  @Column
  ds_mes: string;

  @Column
  ds_vacinados: string;

  @Column
  ds_comorbidades: string;

  @Column
  qt_total_obitos: number;

  @Column
  qt_novos_obitos: number;

  @Column
  tx_letalidade: number;

  @Column
  tx_mortalidade: number;

  @Column
  tx_obitos: number;
}
