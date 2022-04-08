import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateTestagemDto } from './dto/create-testagem.dto';
import { FindFilter } from './dto/filter-obito.dto';
import { UpdateTestagemDto } from './dto/update-testagem.dto';
import { Testagem } from './testagem.model';

@Injectable()
export class TestagemService {
  constructor(@InjectModel(Testagem) private readonly model: typeof Testagem) {}

  create(createTestagemDto: CreateTestagemDto) {
    return 'This action adds a new testagem';
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

  findOne(id: number) {
    return this.model.findByPk(id);
  }

  update(id: number, updateTestagemDto: UpdateTestagemDto) {
    return `This action updates a #${id} testagem`;
  }

  remove(id: number) {
    return `This action removes a #${id} testagem`;
  }
}
