import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Repository } from './repository.entity';
import { Max, Min } from 'class-validator';

@Entity()
export class Metrics {
  @PrimaryColumn({ type: 'bigint' })
  @OneToOne(() => Repository, (repository) => repository.id_repository, {
    onDelete: 'CASCADE',
  })
  id_repository: string;

  @OneToOne(() => Repository, { onDelete: 'CASCADE' })
  @JoinColumn()
  repository: Repository;

  @Min(0)
  @Max(100)
  @Column()
  coverage: number;

  @Min(0)
  @Column()
  bugs: number;

  @Min(0)
  @Column()
  vulnerabilities: number;

  @Min(0)
  @Column()
  hotspot: number;

  @Min(0)
  @Column()
  code_smells: number;
}
