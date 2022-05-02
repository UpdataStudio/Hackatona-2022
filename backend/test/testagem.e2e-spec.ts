import * as dotenv from 'dotenv';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { TestagemModule } from '../src/testagem/testagem.module';
import { TestagemService } from '../src/testagem/testagem.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Testagem } from '../src/testagem/testagem.model';
import { Dialect } from 'sequelize/types';
import * as VacinaFactory from './factories/vacina.factory';
import { init } from './utils/test-module';

dotenv.config();

describe('Testagem', () => {
  let app: INestApplication;
  let service: TestagemService;

  beforeAll(async () => {
    const { moduleRef, app: appFromTest } = await init({
      models: [Testagem],
      providers: [TestagemService],
      modules: [TestagemModule],
    });
    
    app = appFromTest;

    // const moduleRef = await Test.createTestingModule({
    //   imports: [
    //     SequelizeModule.forRoot({
    //       dialect: process.env.DB_DIALECT as Dialect,
    //       host: process.env.DB_HOST,
    //       port: parseInt(process.env.DB_PORT, 10),
    //       database: 'fiocruz_test',
    //       username: process.env.DB_USERNAME,
    //       password: process.env.DB_PASSWORD,
    //       models: [
    //         Testagem, 
    //       ],
    //     }),
    //     SequelizeModule.forFeature([Testagem]),
    //     TestagemModule,
    //   ],
    //   providers: [TestagemService]
    // }).compile();

    service = moduleRef.get<TestagemService>(TestagemService);
    // app = moduleRef.createNestApplication();
    // await app.init();
  });

  it.skip(`/GET Evolução mensal com sucesso.`, async () => {
    const doses = [
      { ds_dose: '1ª dose', qt_aplicada: 26, tx_dose: 0.51 },
      { ds_dose: '2ª dose', qt_aplicada: 46, tx_dose: 0.64 },
      { ds_dose: 'dose de reforço', qt_aplicada: 58, tx_dose: 0.23 },
      { ds_dose: 'dose única', qt_aplicada: 83, tx_dose: 0.15 },
    ]
    await Promise.all(doses.map(dose => 
      VacinaFactory.create({
        service,
        overrides: dose
      })
    ));

    return request(app.getHttpServer())
      .get('/testagem/doses')
      .expect(200)
      .expect([
        {
          label: 'dose de reforço',
          porcentagem: '23.00000000000000000000',
          value: '58'
        },
        {
          label: '1ª dose',
          porcentagem: '51.00000000000000000000',
          value: '26'
        },
        {
          label: 'dose única',
          porcentagem: '15.00000000000000000000',
          value: '83'
        },
        {
          label: '2ª dose',
          porcentagem: '64.00000000000000000000',
          value: '46'
        }
      ]);
  });

  afterAll(async () => {
    await app.close();
  });
});