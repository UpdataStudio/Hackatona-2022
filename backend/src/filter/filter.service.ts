import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Filtro } from './filtro.model';

@Injectable()
export class FilterService {
  constructor(@InjectModel(Filtro) private model: typeof Filtro){}
  
  async findAll(params = {}) {
    const regiaoSaude = await this.model.findAll({
      attributes: [
        ['regiao_saude','label'],
        ['regiao_saude', 'value']
      ],
      group: 'regiao_saude',
      where: params,
    });
    const regiaoAdministrativa = await this.model.findAll({
      attributes: [
        ['regiao_administrativa','label'],
        ['regiao_administrativa', 'value']
      ],
      group: 'regiao_administrativa',
      where: params,
    });
    const bairro = await this.model.findAll({
      attributes: [
        ['bairro','label'],
        ['bairro', 'value']
      ],
      group: 'bairro',
      where: params,
    });
    const ubs = await this.model.findAll({
      attributes: [
        ['ubs','label'],
        ['ubs', 'value'],
      ],
      group: 'ubs',
      where: params,
    });

    return { regiaoSaude, regiaoAdministrativa, bairro, ubs };
  }
}
