import { Module } from '@nestjs/common';
import { CasosCovidService } from './casos-covid.service';
import { CasosCovidController } from './casos-covid.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CasosCovid } from './casos-covid.model';

@Module({
  imports: [SequelizeModule.forFeature([CasosCovid])],
  controllers: [CasosCovidController],
  providers: [CasosCovidService],
})
export class CasosCovidModule {}
