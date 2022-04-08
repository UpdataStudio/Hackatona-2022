import { PartialType } from '@nestjs/mapped-types';
import { CreateCasosCovidDto } from './create-casos-covid.dto';

export class UpdateCasosCovidDto extends PartialType(CreateCasosCovidDto) {}
