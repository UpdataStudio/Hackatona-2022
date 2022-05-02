import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import VacinaFilters from '../types/VacinaFilters';
import { VacinasService } from './vacinas.service';

@ApiTags('Vacinas')
@Controller('vacinas')
export class VacinasController {
  constructor(private readonly vacinasService: VacinasService) {}

  @Get('/doses')
  async findDoses(@Query() params: VacinaFilters) {
    try {
      return await this.vacinasService.findDoses(params);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get('/estoque')
  async findEstoque(@Query() params: VacinaFilters) {
    return await this.vacinasService.findEstoque(params);
  }

  @Get('/dados-por-regiao')
  async findDataByRegiao(@Query() params: VacinaFilters) {
    return await this.vacinasService.findDataByRegiao(params);
  }

  @Get('/filters')
  async findFilters() {
    return await this.vacinasService.filters();
  }
}
