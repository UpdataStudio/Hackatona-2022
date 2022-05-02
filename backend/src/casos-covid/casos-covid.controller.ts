import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import RequestFilters from '../types/RequestFilters';
import { CasosCovidService } from './casos-covid.service';

@ApiTags('Casos Covid')
@Controller('casos-covid')
export class CasosCovidController {
  constructor(private readonly casosCovidService: CasosCovidService) {}

  @Get('/novos-casos')
  async findNovosCasos(@Query() params: RequestFilters) {
    return await this.casosCovidService.findNovosCasos(params);
  }

  @Get('/novos-casos-por-dia')
  async findNovosCasosPorDia(@Query() params: RequestFilters) {
    return await this.casosCovidService.findNovosCasosPorDia(params);
  }

  @Get('/total-casos')
  async findTotalCasos(@Query() params: RequestFilters) {
    return await this.casosCovidService.findTotalCasos(params);
  }

  @Get('/total-casos-por-dia')
  async findTotalCasosPorDia(@Query() params: RequestFilters) {
    return await this.casosCovidService.findTotalCasosPorDia(params);
  }

  @Get('/total-casos-por-situacao')
  async findTotalCasosPorSituacao(@Query() params: RequestFilters) {
    return await this.casosCovidService.findBySituacaoPaciente(params);
  }

  @Get('/pacientes-por-sintomas')
  async findPacientesPorSintomas(@Query() params: RequestFilters) {
    return await this.casosCovidService.findPacientesPorSintomas(params);
  }

  @Get('/casos-por-sexo')
  async findCasosPorSexo(@Query() params: RequestFilters) {
    return await this.casosCovidService.findBySexo(params);
  }

  @Get('/casos-por-faixa-etaria')
  async findCasosPorFaixaEtaria(@Query() params: RequestFilters) {
    return await this.casosCovidService.findByFaixaEtaria(params);
  }

  @Get('/confirmados-em-acompanhamento')
  async findCasosEmAcompanhamento(@Query() params: RequestFilters) {
    return await this.casosCovidService.findConfirmadosEmAcompanhamento(params);
  }

  @Get('/confirmados-internados')
  async findConfirmadosInternados(@Query() params: RequestFilters) {
    return await this.casosCovidService.findConfirmadosInternados(params);
  }

  @Get('/vacinacao')
  async findVacinacao(@Query() params: RequestFilters) {
    return await this.casosCovidService.findVacinacao(params);
  }

  @Get('/medias-comorbidades')
  async findMediasComorbidades(@Query() params: RequestFilters) {
    return await this.casosCovidService.findMediasComorbidades(params);
  }

  @Get('/confirmados-com-comorbidades')
  async findConfirmadosComComorbidades(@Query() params: RequestFilters) {
    return await this.casosCovidService.findConfirmadosComComorbidades(params);
  }

  @Get('/confirmados-em-acompanhamento-por-dia')
  async findCasosEmAcompanhamentoPorDia(@Query() params: RequestFilters) {
    return await this.casosCovidService.findConfirmadosEmAcompanhamentoPorDia(
      params,
    );
  }

  @Get('/confirmados-internados-por-dia')
  async findCasosInternadosPorDia(@Query() params: RequestFilters) {
    return await this.casosCovidService.findConfirmadosInternadosPorDia(params);
  }

  @Get('/dados-por-regiao')
  async findDadosPorRegiao(@Query() params: RequestFilters) {
    return await this.casosCovidService.findDadosPorRegiao(params);
  }

  @Get('/total-casos-por-dia-e-regiao')
  findTotalCasosPorDiaERegiao(@Query() params: RequestFilters) {
    return this.casosCovidService.findTotalCasosPorDiaERegiao(params);
  }

  @Get('/novos-casos-por-dia-e-regiao')
  findNovosCasosPorDiaERegiao(@Query() params: RequestFilters) {
    return this.casosCovidService.findNovosCasosPorDiaERegiao(params);
  }

  @Get('/filters')
  async findFilters() {
    return await this.casosCovidService.filters();
  }
}
