import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'dim_filtros',
  schema: 'hackathona',
  timestamps: false,
  underscored: true,
})
export class Filtro extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @Column
  regiao_saude: string;

  @Column
  regiao_administrativa: string;

  @Column
  ubs: string;
}
