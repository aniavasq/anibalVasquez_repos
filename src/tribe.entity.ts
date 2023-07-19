import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsIn } from 'class-validator';
import { IntStatus, Organization } from './organization.entity';

@Entity()
export class Tribe {
  @PrimaryGeneratedColumn()
  id_tribe: number;

  @ManyToOne(() => Organization)
  id_organization: number;

  @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
  organization: Organization;

  @Column({ length: 50 })
  name: string;

  @IsIn(Object.values(IntStatus))
  @Column({
    type: 'int',
    default: IntStatus.Active,
    enum: Object.values(IntStatus),
  })
  status: number;
}
