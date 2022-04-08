import { Module } from '@nestjs/common';
import { VacinasService } from './vacinas.service';
import { VacinasController } from './vacinas.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vacinas } from './vacinas.model';

@Module({
  imports: [SequelizeModule.forFeature([Vacinas])],
  controllers: [VacinasController],
  providers: [VacinasService],
})
export class VacinasModule {}
