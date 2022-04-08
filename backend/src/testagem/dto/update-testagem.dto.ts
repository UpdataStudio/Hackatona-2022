import { PartialType } from '@nestjs/mapped-types';
import { CreateTestagemDto } from './create-testagem.dto';

export class UpdateTestagemDto extends PartialType(CreateTestagemDto) {}
