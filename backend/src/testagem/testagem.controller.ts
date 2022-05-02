import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TestagemService } from './testagem.service';
import { CreateTestagemDto } from './dto/create-testagem.dto';
import { UpdateTestagemDto } from './dto/update-testagem.dto';
import RequestFilter from '../types/RequestFilters';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Testagem')
@Controller('testagem')
export class TestagemController {
  constructor(private readonly testagemService: TestagemService) {}

  @Post()
  create(@Body() createTestagemDto: CreateTestagemDto) {
    return this.testagemService.create(createTestagemDto);
  }

  @Get()
  findAll(@Query() param: RequestFilter) {
    return this.testagemService.findAll(param);
  }

  @Get('/dados-por-regiao')
  findDadosPorRegiao(@Query() params: RequestFilter) {
    return this.testagemService.findDadosPorRegiao(params);
  }

  @Get('/testes-realizados-por-dia')
  findTestesRealizadosPorDia(@Query() params: RequestFilter) {
    return this.testagemService.findTestesRealizadosPorDia(params);
  }

  @Get('/com-sintomas-por-dia')
  findComSintomasPorDia(@Query() params: RequestFilter) {
    return this.testagemService.findComSintomasPorDia(params);
  }

  @Get('/sem-sintomas-por-dia')
  findSemSintomasPorDia(@Query() params: RequestFilter) {
    return this.testagemService.findSemSintomasPorDia(params);
  }

  @Get('/novos-testes-por-dia')
  findNovosTestesPorDia(@Query() params: RequestFilter) {
    return this.testagemService.findNovosTestesPorDia(params);
  }

  @Get('/evolucao-mensal-testes-realizados')
  findEvolucaoTestesPorMes(@Query() params: RequestFilter) {
    return this.testagemService.findEvolucaoTestesPorMes(params);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.testagemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestagemDto: UpdateTestagemDto) {
    return this.testagemService.update(+id, updateTestagemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testagemService.remove(+id);
  }
}
