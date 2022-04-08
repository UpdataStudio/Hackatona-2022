import { Controller, Get, Query } from '@nestjs/common';
import RequestFilters from 'src/types/RequestFilters';
import { CasosCovidService } from './casos-covid.service';

@Controller('casos-covid')
export class CasosCovidController {
  constructor(private readonly casosCovidService: CasosCovidService) {}

  @Get()
  findAll() {
    return this.casosCovidService.findAll();
  }

  @Get('/novos-casos')
  async findNovosCasos(@Query() params: RequestFilters) {
    return await this.casosCovidService.findNovosCasos(params);
  }

  @Get('/novos-casos-por-mes')
  async findNovosCasosPorMes(@Query() params: RequestFilters) {
    return await this.casosCovidService.findNovosCasosPorMes(params);
  }

  @Get('/total-casos')
  async findTotalCasos(@Query() params: RequestFilters) {
    return await this.casosCovidService.findTotalCasos(params);
  }

  @Get('/total-casos-por-mes')
  async findTotalCasosPorMes(@Query() params: RequestFilters) {
    return await this.casosCovidService.findTotalCasosPorMes(params);
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

  @Get('/confirmados-em-acompanhamento-por-mes')
  async findCasosEmAcompanhamentoPorMes(@Query() params: RequestFilters) {
    return await this.casosCovidService.findConfirmadosEmAcompanhamentoPorMes(
      params,
    );
  }

  @Get('/confirmados-internados-por-mes')
  async findCasosInternadosPorMes(@Query() params: RequestFilters) {
    return await this.casosCovidService.findConfirmadosInternadosPorMes(params);
  }

  @Get('/filters')
  async findFilters() {
    return await this.casosCovidService.filters();
  }
}
