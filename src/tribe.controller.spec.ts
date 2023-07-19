import { Test, TestingModule } from '@nestjs/testing';
import { TribeController } from '../src/tribe.controller';
import { TribeService } from '../src/tribe.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tribe } from './tribe.entity';

describe('TribeController', () => {
  let controller: TribeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TribeController],
      providers: [
        TribeService,
        {
          provide: getRepositoryToken(Tribe),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<TribeController>(TribeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
