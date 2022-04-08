import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUbsDto } from './dto/create-ubs.dto';
import { UpdateUbsDto } from './dto/update-ubs.dto';
import { Ubs } from './ubs.model';

@Injectable()
export class UbsService {
  constructor(@InjectModel(Ubs) private readonly model: typeof Ubs) {}

  create(createUbsDto: CreateUbsDto) {
    return 'This action adds a new ub';
  }

  findAll() {
    return this.model.findAll();
  }

  findUbsFilter() {
    return this.model.findAll({
      attributes: [
        ['nm_estabelecimento', 'label'],
        ['nm_estabelecimento', 'value'],
      ],
      group: 'nm_estabelecimento',
    });
  }

  findOne(id: number) {
    return this.model.findByPk(id);
  }

  update(id: number, updateUbsDto: UpdateUbsDto) {
    return `This action updates a #${id} ub`;
  }

  remove(id: number) {
    return `This action removes a #${id} ub`;
  }
}
