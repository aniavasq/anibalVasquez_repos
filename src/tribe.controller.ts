import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { TribeService } from './tribe.service';
import { Response } from 'express';
import {
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TribeRepository } from './tribe.dto';

@ApiTags('Tribes')
@Controller('tribes')
export class TribeController {
  constructor(private readonly tribeService: TribeService) {}

  checkIdParam(id: string): void {
    if (isNaN(Number(id.toString()))) {
      throw new BadRequestException('Invalid Tribe ID');
    }
  }

  @Get(':id/repositories')
  @ApiOperation({
    summary:
      'Ejercicio 3: Servicio para obtener las métricas de un repositorio',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID de la tribu',
  })
  @ApiResponse({
    status: 200,
    description: 'Repositorios representados en JSON',
    type: TribeRepository,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description:
      'La Tribu no se encuentra registrada o La Tribu no tiene repositorios que cumplan con la cobertura necesaria',
  })
  getTribeRepositories(@Param('id') id: string): Promise<TribeRepository> {
    this.checkIdParam(id);
    return this.tribeService.getTribeRepositories(id);
  }

  @Get(':id/repositories/report')
  @ApiOperation({
    summary: 'Ejercicio 4: Generar reporte CSV métricas repositorio',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID de la tribu',
  })
  @ApiProduces('text/csv')
  @ApiResponse({
    status: 200,
    description: 'Archivo .csv con los repositorios de una tribu',
  })
  @ApiResponse({
    status: 404,
    description:
      'La Tribu no se encuentra registrada o La Tribu no tiene repositorios que cumplan con la cobertura necesaria',
  })
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
