import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize/types';
import { CasosCovid } from '../casos-covid/casos-covid.model';
import { Testagem } from '../testagem/testagem.model';
import { Ubs } from '../ubs/ubs.model';
import { Vacinas } from '../vacinas/vacinas.model';
import { Obito } from '../obito/obito.model';
import { Filtro } from '../filter/filtro.model';
import { RangesMapa } from 'src/ranges-mapa/ranges-mapa.model';

dotenv.config();

type DatabaseConfig = {
  [key: string]: SequelizeModuleOptions
};

const config: DatabaseConfig = {
  development: {
    dialect: process.env.DB_DIALECT as Dialect,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    models: [
      Testagem, 
      Vacinas, 
      Ubs, 
      CasosCovid, 
      Obito, 
      Filtro,
      RangesMapa,
    ],
  },
  test: {
    dialect: process.env.DB_DIALECT as Dialect,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: 'fiocruz_test',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    models: [
      Testagem, 
      Vacinas, 
      Ubs, 
      CasosCovid, 
      Obito, 
      Filtro,
      RangesMapa,
    ],
  },
  production: {
    dialect: process.env.DB_DIALECT as Dialect,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    models: [
      Testagem, 
      Vacinas, 
      Ubs, 
      CasosCovid, 
      Obito, 
      Filtro,
      RangesMapa,
    ],
  }
};

const env = process.env.NODE_ENV || 'development';

export default config[env];
