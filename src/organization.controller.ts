import { Controller, Post, Body } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from './organization.dto';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  createOrganization(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    return this.organizationService.createOrganization(createOrganizationDto);
  }
}
