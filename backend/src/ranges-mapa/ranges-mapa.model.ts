import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'tab_mapas',
  schema: 'hackathona',
  timestamps: false,
  underscored: true,
})
export class RangesMapa extends Model {

  @PrimaryKey
  @Column
  co_cor: string;

  @PrimaryKey
  @Column
  no_aba: string;

  @Column
  vl_minimo: number;

  @Column
  vl_maximo: number;
}
