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
import { CreateObitoDto } from './dto/create-obito.dto';
import { FindFilter } from './dto/filter-obito.dto';
import { UpdateObitoDto } from './dto/update-obito.dto';
import { ObitoService } from './obito.service';

@Controller('obito')
export class ObitoController {
  constructor(private readonly obitoService: ObitoService) {}

  @Post()
  create(@Body() createObitoDto: CreateObitoDto) {
    return this.obitoService.create(createObitoDto);
  }

  @Get()
  findAll(@Body() param: FindFilter) {
    return this.obitoService.findAll(param);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateobitoDto: UpdateObitoDto) {
    return this.obitoService.update(+id, updateobitoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.obitoService.remove(+id);
  }
}
