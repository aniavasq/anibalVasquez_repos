import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from './organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async createOrganization(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    const organization = this.organizationRepository.create(
      createOrganizationDto,
    );
    return this.organizationRepository.save(organization);
  }
}
