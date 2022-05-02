import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RangesMapaService } from './ranges-mapa.service';

@Controller('ranges-mapa')
export class RangesMapaController {
  constructor(private readonly rangesMapaService: RangesMapaService) {}

  @Post()
  create(data) {
    return this.rangesMapaService.create(data);
  }

  @Get()
  findAll() {
    return this.rangesMapaService.findAll();
  }
}
