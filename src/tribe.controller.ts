import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { TribeService } from './tribe.service';
import { Tribe } from './tribe.entity';

@Controller('tribes')
export class TribeController {
  constructor(private readonly tribeService: TribeService) {}

  @Get(':id/repositories')
  getTribeRepositories(@Param('id') id: string): Promise<Tribe> {
    if (isNaN(Number(id.toString()))) {
      throw new BadRequestException('Invalid Tribe ID');
    }
    return this.tribeService.getTribeRepositories(id);
  }
}
