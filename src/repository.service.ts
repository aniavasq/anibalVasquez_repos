import { Injectable } from '@nestjs/common';
import { RepositorVerification } from './repository.interface';

@Injectable()
export class RepositoryService {
  private readonly repositoryVerifications: RepositorVerification[] = [
    { id: 1, state: 604 },
    { id: 2, state: 605 },
    { id: 3, state: 606 },
  ];

  findVerifications() {
    return new Promise<RepositorVerification[]>((resolve) =>
      resolve(this.repositoryVerifications),
    );
  }
}
