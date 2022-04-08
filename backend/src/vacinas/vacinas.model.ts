import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'vw_vacinas',
  schema: 'hackathona',
  timestamps: false,
  underscored: true,
})
export class Vacinas extends Model {
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
  ds_dose: string;

  @Column
  tx_dose: number;

  @Column
  qt_aplicada: number;

  @Column
  qt_estoque: number;

  @Column
  ds_acima_12_anos: string;

  @Column
  ds_fabricante: string;
}
