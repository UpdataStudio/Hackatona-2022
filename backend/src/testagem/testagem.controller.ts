import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestagemService } from './testagem.service';
import { CreateTestagemDto } from './dto/create-testagem.dto';
import { UpdateTestagemDto } from './dto/update-testagem.dto';
import { FindFilter } from './dto/filter-obito.dto';

@Controller('testagem')
export class TestagemController {
  constructor(private readonly testagemService: TestagemService) {}

  @Post()
  create(@Body() createTestagemDto: CreateTestagemDto) {
    return this.testagemService.create(createTestagemDto);
  }

  @Get()
  findAll(@Body() param: FindFilter) {
    return this.testagemService.findAll(param);
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
