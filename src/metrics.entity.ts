import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Repository } from './repository.entity';

@Entity()
export class Metrics {
  @PrimaryColumn()
  @ManyToOne(() => Repository, (repository) => repository.id_repository, {
    onDelete: 'CASCADE',
  })
  id_repository: number;

  @ManyToOne(() => Repository, { onDelete: 'CASCADE' })
  repository: Repository;

  @Column()
  coverage: number;

  @Column()
  bugs: number;

  @Column()
  vulnerabilities: number;

  @Column()
  hotspot: number;

  @Column()
  code_smells: number;
}
