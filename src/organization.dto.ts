import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationDto {
  @ApiProperty({
    description: 'Nombre de la organizacion',
    example: 'Banco Pichincha',
  })
  name: string;
}

export class UpdateOrganizationDto {
  @ApiProperty({
    description: 'Nombre de la organizacion',
    example: 'Banco Pichincha',
  })
  name?: string;
}
