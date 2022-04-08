import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FindFilter } from './dto/filter-obito.dto';
import { UpdateObitoDto } from './dto/update-obito.dto';
import { Obito } from './obito.model';

@Injectable()
export class ObitoService {
  constructor(
    @InjectModel(Obito)
    private readonly model: typeof Obito,
  ) {}

  async create(createObitoDto: any) {
    return await this.model.create({ ...createObitoDto });
  }

  async findAll(param: FindFilter) {
    return this.model.findAll({ 
      where: { 
        ds_mes: { 
          [Op.gte]: param.inicio,
          [Op.lte]: param.fim
        },
        [Op.and]: [
          { ds_regiao: param.regiao },
          { pk_ubs_cnes: param.ubs },
          { ds_regiao_administrativa: param.bairro }
        ]
      },
      order: [
        ['ds_mes', 'DESC']
      ]
    })
  }

  async findOne(id: number) {
    return await this.model.findOne({ where: { id } });
  }

  async update(id: number, updateObitoDto: UpdateObitoDto) {
    return await this.model.update(
      { ...updateObitoDto },
      { where: { id } },
    );
  }

  remove(id: number) {
    this.model.destroy({ where: { id } });
  }
}
