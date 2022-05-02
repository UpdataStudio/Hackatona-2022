import { Module } from '@nestjs/common';
import { CasosCovidService } from './casos-covid.service';
import { CasosCovidController } from './casos-covid.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CasosCovid } from './casos-covid.model';
import { Ubs } from '../ubs/ubs.model';

@Module({
  imports: [SequelizeModule.forFeature([CasosCovid, Ubs])],
  controllers: [CasosCovidController],
  providers: [CasosCovidService],
})
export class CasosCovidModule {}
