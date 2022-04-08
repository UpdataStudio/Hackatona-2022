import { PartialType } from '@nestjs/mapped-types';
import { CreateObitoDto } from './create-obito.dto';

export class UpdateObitoDto extends PartialType(CreateObitoDto) {}
