import { Module } from '@nestjs/common';
import { UbsService } from './ubs.service';
import { UbsController } from './ubs.controller';
import { Ubs } from './ubs.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Ubs])],
  controllers: [UbsController],
  providers: [UbsService],
})
export class UbsModule {}
