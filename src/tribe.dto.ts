import { ApiProperty } from '@nestjs/swagger';

export class TribeRepository {
  @ApiProperty({
    description: 'ID del repositorio',
    example: '883699434638245889',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre del repositorio',
    example: 'cd-common-utils',
  })
  name: string;

  @ApiProperty({
    description: 'Nombre de la tribu',
    example: 'Centro Digital',
  })
  tribe: string;

  @ApiProperty({
    description: 'Nombre de la oranizacion',
    example: 'Banco Pichincha',
  })
  organization: string;

  @ApiProperty({
    description: 'Cobertura de pruebas unitarias',
    example: '80%',
  })
  coverage: string;

  @ApiProperty({
    description: 'Metrica de code smells del analisis del codigo',
    example: '1',
  })
  codeSmells: number;

  @ApiProperty({
    description: 'Metrica de bugs del analisis del codigo',
    example: '2',
  })
  bugs: number;

  @ApiProperty({
    description: 'Metrica de vulnerabilidades del analisis del codigo',
    example: '1',
  })
  vulnerabilities: number;

  @ApiProperty({
    description: 'Metrica de hotspots del analisis del codigo',
    example: '0',
  })
  hotspots: number;

  @ApiProperty({
    description: 'Estado de verificación (Mock)',
    example: 'Verificado',
  })
  verificationState: string;

  @ApiProperty({
    description: 'Estado del repositorio (state)',
    example: 'Habilitado',
  })
  state: string;
}
