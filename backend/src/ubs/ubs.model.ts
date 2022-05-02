import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'dim_ubs',
  schema: 'hackathona',
  timestamps: false,
  underscored: true,
})
export class Ubs extends Model {
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
  co_lat: number;

  @Column
  co_lon: number;
}
