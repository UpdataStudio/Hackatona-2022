import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize/types';
import { CasosCovid } from 'src/casos-covid/casos-covid.model';
import { Testagem } from 'src/testagem/testagem.model';
import { Ubs } from 'src/ubs/ubs.model';
import { Vacinas } from 'src/vacinas/vacinas.model';
import { Obito } from 'src/obito/obito.model';

dotenv.config();

const config: SequelizeModuleOptions = {
  dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  models: [Testagem, Vacinas, Ubs, CasosCovid, Obito],
};

export default config;
