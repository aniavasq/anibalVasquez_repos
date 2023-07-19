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

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  createOrganization(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    return this.organizationService.createOrganization(createOrganizationDto);
  }

  @Get()
  getAllOrganizations(): Promise<Organization[]> {
    return this.organizationService.getAllOrganizations();
  }

  checkIdParam(id: string): void {
    if (isNaN(Number(id.toString()))) {
      throw new BadRequestException('Invalid Organization ID');
    }
  }

  @Get(':id')
  getOrganizationById(@Param('id') id: string): Promise<Organization> {
    this.checkIdParam(id);
    return this.organizationService.getOneOrganization(id);
  }

  @Put(':id')
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
  deleteOrganization(@Param('id') id: string): Promise<Organization> {
    this.checkIdParam(id);
    return this.organizationService.deleteOrganization(id);
  }
}
