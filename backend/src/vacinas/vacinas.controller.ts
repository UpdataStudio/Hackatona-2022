import { Controller, Get, Query } from '@nestjs/common';
import RequestFilters from 'src/types/RequestFilters';
import { VacinasService } from './vacinas.service';

@Controller('vacinas')
export class VacinasController {
  constructor(private readonly vacinasService: VacinasService) {}

  @Get()
  findAll() {
    return this.vacinasService.findAll();
  }

  @Get('/doses')
  async findDoses(@Query() params: RequestFilters) {
    return await this.vacinasService.findDoses(params);
  }

  @Get('/estoque')
  async findEstoque(@Query() params: RequestFilters) {
    return await this.vacinasService.findEstoque(params);
  }

  @Get('/dados-por-regiao')
  async findDataByRegiao(@Query() params: RequestFilters) {
    return await this.vacinasService.findDataByRegiao(params);
  }

  @Get('/filters')
  async findFilters() {
    return await this.vacinasService.filters();
  }
}
