import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntStatus, Organization } from './organization.entity';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from './organization.dto';

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

  async getAllOrganizations(): Promise<Organization[]> {
    return this.organizationRepository.find({
      where: { status: IntStatus.Active },
    });
  }

  async getOrganizationById(id: string): Promise<Organization> {
    return this.organizationRepository.findOneBy({
      id_organization: id,
      status: IntStatus.Active,
    });
  }

  async getOneOrganization(id: string): Promise<Organization> {
    const organization = await this.getOrganizationById(id);
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }
    return organization;
  }

  async updateOrganization(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    const organization = await this.getOneOrganization(id);

    return this.organizationRepository.save({
      ...organization,
      ...updateOrganizationDto,
    });
  }

  async deleteOrganization(id: string): Promise<Organization> {
    const organization = await this.getOneOrganization(id);

    return this.organizationRepository.save({
      ...organization,
      status: IntStatus.Inactive,
    });
  }
}
