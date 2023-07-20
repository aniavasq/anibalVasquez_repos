import { Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum IntStatus {
  Inactive,
  Active,
}

@Entity()
export class Organization {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty({ description: 'ID de la organizacion', example: 1 })
  id_organization: string;

  @Length(1, 50)
  @Column({ length: 50 })
  @ApiProperty({
    description: 'Nombre de la organizacion',
    example: 'Banco Pichincha',
  })
  name: string;

  @Column({
    type: 'int',
    default: IntStatus.Active,
    enum: Object.values(IntStatus),
  })
  @ApiProperty({
    description: 'Status de la organizacion. Puede ser 0 o 1',
    example: 1,
  })
  status: number;
}
