import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { TribeService } from './tribe.service';
import { Tribe } from './tribe.entity';
import { Response } from 'express';

@Controller('tribes')
export class TribeController {
  constructor(private readonly tribeService: TribeService) {}

  checkIdParam(id: string): void {
    if (isNaN(Number(id.toString()))) {
      throw new BadRequestException('Invalid Tribe ID');
    }
  }

  @Get(':id/repositories')
  getTribeRepositories(@Param('id') id: string): Promise<Tribe> {
    this.checkIdParam(id);
    return this.tribeService.getTribeRepositories(id);
  }

  @Get(':id/repositories/report')
  async getTribeRepositoriesReport(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.checkIdParam(id);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="tribe_repositories.csv"',
    );
    try {
      const csvData = await this.tribeService.generateTribeRepositoriesCsv(id);
      res.send(csvData);
    } catch (err) {
      console.error('Error generating CSV data:', err);
      res.status(500).send('Error generating CSV data');
    }
    return;
  }
}
