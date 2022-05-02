import { SequelizeModule } from "@nestjs/sequelize";
import { Test } from "@nestjs/testing";
import { Dialect } from "sequelize/types";

export async function init({models, modules = [], providers = []}) {
    const moduleRef = await Test.createTestingModule({
        imports: [
          SequelizeModule.forRoot({
            dialect: process.env.DB_DIALECT as Dialect,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            database: 'fiocruz_test',
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            models,
          }),
          SequelizeModule.forFeature(models),
          ...modules,
        ],
        providers
    }).compile();

    const app = moduleRef.createNestApplication();
    await app.init();

    return { app, moduleRef };
}
