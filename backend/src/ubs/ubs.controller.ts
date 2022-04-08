import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UbsService } from './ubs.service';
import { CreateUbsDto } from './dto/create-ubs.dto';
import { UpdateUbsDto } from './dto/update-ubs.dto';

@Controller('ubs')
export class UbsController {
  constructor(private readonly ubsService: UbsService) {}

  @Post()
  create(@Body() createUbsDto: CreateUbsDto) {
    return this.ubsService.create(createUbsDto);
  }

  @Get()
  findAll() {
    return this.ubsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ubsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUbsDto: UpdateUbsDto) {
    return this.ubsService.update(+id, updateUbsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ubsService.remove(+id);
  }
}
