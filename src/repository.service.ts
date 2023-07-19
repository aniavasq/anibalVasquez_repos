import { Injectable } from '@nestjs/common';
import { RepositorVerification } from './repository.interface';

export enum VerificationState {
  Verified = 604,
  Waiting = 605,
  Approved = 606,
}

@Injectable()
export class RepositoryService {
  private readonly repositoryVerifications: RepositorVerification[] = [
    { id: '883699824988979201', state: VerificationState.Verified },
    { id: '883781753838600193', state: VerificationState.Waiting },
    { id: '883800778129833985', state: VerificationState.Approved },
  ];

  findVerifications() {
    return new Promise<RepositorVerification[]>((resolve) =>
      resolve(this.repositoryVerifications),
    );
  }
}
