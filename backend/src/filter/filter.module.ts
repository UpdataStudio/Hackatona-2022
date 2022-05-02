import { Module } from '@nestjs/common';
import { FilterService } from './filter.service';
import { FilterController } from './filter.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Filtro } from './filtro.model';

@Module({
  imports: [SequelizeModule.forFeature([Filtro])],
  controllers: [FilterController],
  providers: [FilterService]
})
export class FilterModule {}
