'use strict';

module.exports = {
  async up (queryInterface, { DataTypes }) {
    await queryInterface.createTable('vw_vacinas', {
      pk_ubs_cnes: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      ds_regiao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tp_estabelecimento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nm_estabelecimento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ds_bairro: {
        type: DataTypes.STRING,
      },
      ds_endereco: {
        type: DataTypes.STRING,
      },
      ds_complemento: {
        type: DataTypes.STRING,
      },
      nu_numero: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ds_regiao_administrativa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ds_mes: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      ds_dose: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      tx_dose: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      qt_aplicada: {
        type: DataTypes.SMALLINT,
        allowNull: true
      },
      qt_estoque: {
        type: DataTypes.SMALLINT,
        allowNull: true
      },
      ds_acima_12_anos: {
        type: DataTypes.CHAR(3),
        allowNull: true
      },
      ds_fabricante: {
        type: DataTypes.STRING(50),
        allowNull: true
      }
    }, { schema: 'hackathona' });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('vw_vacinas');
  }
};
