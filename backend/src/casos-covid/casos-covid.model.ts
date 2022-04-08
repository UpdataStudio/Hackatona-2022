import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'vw_casos_covid',
  schema: 'hackathona',
  timestamps: false,
  underscored: true,
})
export class CasosCovid extends Model {
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
  ds_casos: string;

  @Column
  ds_faixa_etaria: string;

  @Column
  qt_total_casos: number;

  @Column
  qt_novos_casos: number;

  @Column
  tx_sintomas_leves: number;

  @Column
  tx_sintomas_graves: number;

  @Column
  tx_assintomaticos: number;

  @Column
  tx_homens: number;

  @Column
  tx_mulheres: number;
}
