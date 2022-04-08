import { PartialType } from '@nestjs/mapped-types';
import { CreateUbsDto } from './create-ubs.dto';

export class UpdateUbsDto extends PartialType(CreateUbsDto) {}
