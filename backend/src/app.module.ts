import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UbsModule } from './ubs/ubs.module';
import { CasosCovidModule } from './casos-covid/casos-covid.module';
import { TestagemModule } from './testagem/testagem.module';
import { VacinasModule } from './vacinas/vacinas.module';
import { ObitoModule } from './obito/obito.module';
import databaseConfig from './config/database';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot(databaseConfig),
    UbsModule,
    CasosCovidModule,
    TestagemModule,
    VacinasModule,
    ObitoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
