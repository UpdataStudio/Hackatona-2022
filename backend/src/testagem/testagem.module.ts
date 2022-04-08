import { Module } from '@nestjs/common';
import { TestagemService } from './testagem.service';
import { TestagemController } from './testagem.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Testagem } from './testagem.model';

@Module({
  imports: [SequelizeModule.forFeature([Testagem])],
  controllers: [TestagemController],
  providers: [TestagemService],
})
export class TestagemModule {}
