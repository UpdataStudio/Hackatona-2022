import { Module } from '@nestjs/common';
import { ObitoService } from './obito.service';
import { ObitoController } from './obito.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Obito } from './obito.model';

@Module({
  imports: [SequelizeModule.forFeature([Obito])],
  controllers: [ObitoController],
  providers: [ObitoService],
})
export class ObitoModule {}
