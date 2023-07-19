import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Length, IsIn } from 'class-validator';
import { Tribe } from './tribe.entity';

export enum RepositoryState {
  Enable = 'E',
  Disable = 'D',
  Archived = 'A',
}

export enum RepositoryStatus {
  Active = 'A',
  Inactive = 'I',
}

@Entity()
export class Repository {
  @PrimaryGeneratedColumn()
  id_repository: number;

  @ManyToOne(() => Tribe)
  id_tribe: number;

  @ManyToOne(() => Tribe, { onDelete: 'CASCADE' }) // You can set the appropriate onDelete behavior.
  tribe: Tribe;

  @Column({ length: 50 })
  name: string;

  @Length(1, 1)
  @IsIn(Object.values(RepositoryState))
  @Column({
    length: 1,
    default: RepositoryState.Enable,
    enum: Object.values(RepositoryState),
  })
  state: string;

  @CreateDateColumn()
  create_time: Date;

  @Length(1, 1)
  @IsIn(Object.values(RepositoryStatus))
  @Column({
    length: 1,
    default: RepositoryStatus.Active,
    enum: Object.values(RepositoryStatus),
  })
  status: string;
}
