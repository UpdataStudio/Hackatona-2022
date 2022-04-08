import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'vw_testagem',
  schema: 'hackathona',
  timestamps: false,
  underscored: true,
})
export class Testagem extends Model {
  @PrimaryKey
  @Column
  pk_ubs_cnes: number;

  @Column
  ds_regiao: string;

  @Column
  tp_estabelecimento: string;

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
  tp_teste: string;

  @Column
  qt_testes_realizados: number;

  @Column
  tx_negativos: number;

  @Column
  tx_positivos: number;

  @Column
  tx_com_sintomas: number;

  @Column
  tx_sem_sintomas: number;

  @Column
  tx_novo_teste: number;
}
