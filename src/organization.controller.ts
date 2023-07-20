import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { Organization } from './organization.entity';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from './organization.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiOperation({
    summary: 'Ejercicio 2 - Escenario 1: Crear organizacion',
  })
  @ApiResponse({
    status: 201,
    description: 'Lista de organizaciones',
    type: Organization,
  })
  createOrganization(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    return this.organizationService.createOrganization(createOrganizationDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Ejercicio 2 - Escenario 3: Obtener organizaciones',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de organizaciones',
    type: Organization,
    isArray: true,
  })
  getAllOrganizations(): Promise<Organization[]> {
    return this.organizationService.getAllOrganizations();
  }

  checkIdParam(id: string): void {
    if (isNaN(Number(id.toString()))) {
      throw new BadRequestException('Invalid Organization ID');
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Ejercicio 2 - Escenario 3: Obtener organizaciones',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID de la organizacion',
  })
  @ApiResponse({
    status: 200,
    description: 'Organizacion representada en JSON',
    type: Organization,
  })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  getOrganizationById(@Param('id') id: string): Promise<Organization> {
    this.checkIdParam(id);
    return this.organizationService.getOneOrganization(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Ejercicio 2 - Escenario 2: Editar organizacion',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID de la organizacion',
  })
  @ApiResponse({
    status: 200,
    description: 'Organizacion representada en JSON luego de la edicion',
    type: Organization,
  })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  updateOrganization(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    this.checkIdParam(id);
    return this.organizationService.updateOrganization(
      id,
      updateOrganizationDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Ejercicio 2 - Escenario 4: Eliminar organizaciones',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID de la organizacion',
  })
  @ApiResponse({
    status: 200,
    description:
      'Organizacion representada en JSON luego de ser eliminada (borrado logico)',
    type: Organization,
  })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  deleteOrganization(@Param('id') id: string): Promise<Organization> {
    this.checkIdParam(id);
    return this.organizationService.deleteOrganization(id);
  }
}
