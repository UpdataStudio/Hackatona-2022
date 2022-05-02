import { ApiProperty } from "@nestjs/swagger";

export default class RequestFilter {
  @ApiProperty({
    name: 'inicio',
    description: 'Data de início',
    example: '2022-02-01',
    required: false
  })
  inicio?: string;
  @ApiProperty({
    name: 'fim',
    description: 'Data de fim',
    example: '2022-02-01',
    required: false,
  })
  fim?: string;
  @ApiProperty({
    name: 'regiao_administrativa',
    description: 'Região Administrativa',
    example: 'Plano Piloto',
    required: false,
  })
  regiao_administrativa?: string;
  @ApiProperty({
    name: 'regiao_saude',
    description: 'Região de saúde',
    example: 'Região Central',
    required: false,
  })
  regiao_saude?: string;
  @ApiProperty({
    name: 'bairro',
    description: 'Bairro',
    example: 'Asa Sul',
    required: false,
  })
  bairro?: string;
  @ApiProperty({
    name: 'ubs',
    description: 'UBS',
    example: 'UBS 1 - Asa Sul',
    required: false
  })
  ubs?: string;
}
