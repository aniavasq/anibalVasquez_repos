import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum IntStatus {
  Inactive,
  Active,
}

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id_organization: number;

  @Column({ type: 'char', length: 50 })
  name: string;

  @Column({
    type: 'int',
    default: IntStatus.Active,
    enum: Object.values(IntStatus),
  })
  status: number;
}
