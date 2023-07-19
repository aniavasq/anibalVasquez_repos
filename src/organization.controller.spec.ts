import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from './organization.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { Repository } from 'typeorm';
import { OrganizationService } from './organization.service';

describe('OrganizationController', () => {
  let controller: OrganizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationController],
      providers: [
        OrganizationService,
        {
          provide: getRepositoryToken(Organization),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<OrganizationController>(OrganizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
