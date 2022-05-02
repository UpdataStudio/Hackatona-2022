import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import RequestFilter from '../types/RequestFilters';
import { CreateObitoDto } from './dto/create-obito.dto';
import { UpdateObitoDto } from './dto/update-obito.dto';
import { ObitoService } from './obito.service';

@ApiTags('Óbitos')
@Controller('obito')
export class ObitoController {
  constructor(private readonly obitoService: ObitoService) {}

  @Post()
  create(@Body() createObitoDto: CreateObitoDto) {
    return this.obitoService.create(createObitoDto);
  }

  @Get()
  findAll(@Query() param: RequestFilter) {
    return this.obitoService.findQtTxObitos(param);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateobitoDto: UpdateObitoDto) {
    return this.obitoService.update(+id, updateobitoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.obitoService.remove(+id);
  }

  @Get('/dados-por-regiao')
  findDadosPorRegiao(@Query() params: RequestFilter) {
    return this.obitoService.findDadosPorRegiao(params);
  }

  @Get('/novos-obitos-por-dia')
  findNovosObitosPorDia(@Query() params: RequestFilter) {
    return this.obitoService.findNovosObitosPorDia(params);
  }

  @Get('/total-obitos-por-dia')
  findTotalObitosPorDia(@Query() params: RequestFilter) {
    return this.obitoService.findTotalObitosPorDia(params);
  }
}
