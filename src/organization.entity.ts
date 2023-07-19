import { Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum IntStatus {
  Inactive,
  Active,
}

@Entity()
export class Organization {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_organization: string;

  @Length(1, 50)
  @Column({ length: 50 })
  name: string;

  @Column({
    type: 'int',
    default: IntStatus.Active,
    enum: Object.values(IntStatus),
  })
  status: number;
}
