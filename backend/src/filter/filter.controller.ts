import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilterService } from './filter.service';

@ApiTags('Filtros')
@Controller('filters')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get()
  findAll(@Query() params) {
    return this.filterService.findAll(params);
  }
}
