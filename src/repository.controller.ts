import { Controller, Get } from '@nestjs/common';
import { RepositoryService } from './repository.service';

@Controller('repositories')
export class RepositoryController {
  constructor(private repositoryService: RepositoryService) {}

  @Get('verifications')
  repositoryVerifications() {
    return this.repositoryService.findVerifications();
  }
}
