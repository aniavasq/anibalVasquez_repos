import { Controller, Get } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Repositories')
@Controller('repositories')
export class RepositoryController {
  constructor(private repositoryService: RepositoryService) {}

  @ApiOperation({
    summary: `Ejercicio 1: Servicio simulado (Mock)`,
  })
  @Get('verifications')
  repositoryVerifications() {
    return this.repositoryService.findVerifications();
  }
}
