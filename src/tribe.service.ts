import axios from 'axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Tribe, IntStatus } from './tribe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { RepositoryState } from './repository.entity';
import { RepositorVerification } from './repository.interface';
import { VerificationState } from './repository.service';

@Injectable()
export class TribeService {
  constructor(
    @InjectRepository(Tribe)
    private readonly tribeRepository: Repository<Tribe>,
  ) {}

  humanRepositoryState(repositoryState: RepositoryState): string {
    switch (repositoryState) {
      case RepositoryState.Enable:
        return 'Habilitado';
      case RepositoryState.Disable:
        return 'Deshabilitado';
      case RepositoryState.Archived:
        return 'Archivado';
      default:
        return 'Estado desconocido';
    }
  }

  async fetchRepositoriesVerificationData() {
    try {
      const url = 'http://localhost:3000/repositories/verifications';
      const response = await axios.get(url);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  humanVerificationState(verificationState: VerificationState) {
    switch (verificationState) {
      case VerificationState.Approved:
        return 'Aprobado';
      case VerificationState.Waiting:
        return 'En espera';
      case VerificationState.Verified:
        return 'Verificado';
      default:
        return 'Estado desconocido';
    }
  }

  matchingVerificationState(
    repositoryVerifications: RepositorVerification[],
    repositoryId: string,
  ): string {
    for (const repositoryVerification of repositoryVerifications) {
      if (repositoryVerification.id == repositoryId) {
        return this.humanVerificationState(repositoryVerification.state);
      }
    }
    return '';
  }

  async getTribeRepositoriesQuery(
    id: string,
  ): Promise<SelectQueryBuilder<Tribe>> {
    const tribe = await this.tribeRepository.findOneBy({ id_tribe: id });

    if (!tribe) {
      throw new NotFoundException('La Tribu no se encuentra registrada');
    }

    return this.tribeRepository
      .createQueryBuilder('tribe')
      .leftJoin('tribe.repositories', 'repository')
      .leftJoin('repository.metrics', 'metrics')
      .leftJoin('tribe.organization', 'organization')
      .where({
        id_tribe: tribe.id_tribe,
        status: IntStatus.Active,
      })
      .andWhere(
        "date_part('year', repository.create_time) = date_part('year', CURRENT_DATE)",
      )
      .andWhere('repository.state = :repositoryState', {
        repositoryState: RepositoryState.Enable,
      })
      .andWhere('metrics.coverage > 75')
      .select([
        'repository.id_repository AS id',
        'repository.name AS name',
        'tribe.name AS tribe',
        'organization.name AS organization',
        "CONCAT(metrics.coverage::text, '%') AS coverage",
        'metrics.code_smells AS codeSmells',
        'metrics.bugs AS bugs',
        'metrics.vulnerabilities AS vulnerabilities',
        'metrics.hotspot AS hotspots',
        'repository.state AS state',
      ]);
  }

  async getTribeRepositories(id: string): Promise<any> {
    const repositories = await (
      await this.getTribeRepositoriesQuery(id)
    ).execute();

    if (!repositories.length) {
      throw new NotFoundException(
        'La Tribu no tiene repositorios que cumplan con la cobertura necesaria',
      );
    }

    const repositoryVerifications =
      await this.fetchRepositoriesVerificationData();

    for (const repository of repositories) {
      repository['state'] = this.humanRepositoryState(repository['state']);
      repository['verificationState'] = this.matchingVerificationState(
        repositoryVerifications,
        repository.id,
      );
    }

    return { repositories };
  }

  async generateTribeRepositoriesCsv(id: string): Promise<string> {
    const repositories = await this.getTribeRepositories(id);

    const csvData: string[] = [];
    const headers = [
      'Repository ID',
      'Repository Name',
      'Tribe Name',
      'Organization Name',
      'Coverage',
      'Code Smells',
      'Bugs',
      'Vulnerabilities',
      'Hotspots',
      'Repository State',
      'Verification State',
    ];
    csvData.push(headers.join(','));

    for (const repo of repositories.repositories) {
      csvData.push(
        [
          repo.id,
          repo.name,
          repo.tribe,
          repo.organization,
          repo.coverage,
          repo.codesmells,
          repo.bugs,
          repo.vulnerabilities,
          repo.hotspots,
          repo.state,
          repo.verificationState,
        ].join(','),
      );
    }
    return csvData.join('\n');
  }
}
