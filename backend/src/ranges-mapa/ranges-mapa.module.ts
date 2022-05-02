import { Module } from '@nestjs/common';
import { RangesMapaService } from './ranges-mapa.service';
import { RangesMapaController } from './ranges-mapa.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RangesMapa } from './ranges-mapa.model';

@Module({
  imports: [SequelizeModule.forFeature([RangesMapa])],
  controllers: [RangesMapaController],
  providers: [RangesMapaService]
})
export class RangesMapaModule {}
