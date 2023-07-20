import { Test, TestingModule } from '@nestjs/testing';
import { TribeService } from '../src/tribe.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tribe } from '../src/tribe.entity';
import { RepositoryState } from './repository.entity';
import { VerificationState } from './repository.service';
import { NotFoundException } from '@nestjs/common';

const mockTribe = { id_tribe: '1', name: 'Test Tribe' } as Tribe;
const mockRepositories = [
  {
    id: '1',
    name: 'Repo 1',
    tribe: mockTribe.name,
    organization: 'Some Organization',
    coverage: '85%',
    codeSmells: 0,
    bugs: 0,
    vulnerabilities: 0,
    hotspots: 0,
    state: RepositoryState.Enable,
  },
];
const mockCreateQueryBuilder = (mockRepositories: any[]) => {
  return {
    leftJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    execute: jest.fn().mockResolvedValue(mockRepositories),
  } as any;
};
const mockFetchRepositoriesVerificationData = jest.fn().mockResolvedValue([
  { id: '1', state: VerificationState.Approved },
  { id: '2', state: VerificationState.Waiting },
  { id: '3', state: VerificationState.Verified },
]);

describe('TribeService', () => {
  let service: TribeService;
  let tribeRepository: Repository<Tribe>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TribeService,
        {
          provide: getRepositoryToken(Tribe),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TribeService>(TribeService);
    tribeRepository = module.get<Repository<Tribe>>(getRepositoryToken(Tribe));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return repositories for a valid tribe (ejercicio 3 - escenario 1)', async () => {
    jest.spyOn(tribeRepository, 'findOneBy').mockResolvedValue(mockTribe);
    jest
      .spyOn(tribeRepository, 'createQueryBuilder')
      .mockReturnValue(mockCreateQueryBuilder(mockRepositories));

    const result = await service.getTribeRepositories('1');
    expect(result).toEqual({
      repositories: [
        {
          id: '1',
          name: 'Repo 1',
          tribe: 'Test Tribe',
          organization: 'Some Organization',
          coverage: '85%',
          codeSmells: 0,
          bugs: 0,
          vulnerabilities: 0,
          hotspots: 0,
          state: 'Habilitado',
          verificationState: '',
        },
      ],
    });
  });

  it('should throw not found tribe error (ejercicio 3 - escenario 2)', async () => {
    jest.spyOn(tribeRepository, 'findOneBy').mockResolvedValue(null);
    jest
      .spyOn(tribeRepository, 'createQueryBuilder')
      .mockReturnValue(mockCreateQueryBuilder(mockRepositories));

    try {
      await service.getTribeRepositories('1');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('La Tribu no se encuentra registrada');
    }
  });

  it('should throw no repository matching (ejercicio 3 - escenario 3)', async () => {
    const mockTribe = { id_tribe: '1', name: 'Test Tribe' } as Tribe;
    const mockRepositories = [];

    jest.spyOn(tribeRepository, 'findOneBy').mockResolvedValue(mockTribe);
    jest
      .spyOn(tribeRepository, 'createQueryBuilder')
      .mockReturnValue(mockCreateQueryBuilder(mockRepositories));

    try {
      await service.getTribeRepositories('1');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe(
        'La Tribu no tiene repositorios que cumplan con la cobertura necesaria',
      );
    }
  });

  it('should show verification state (ejercicio 3 - escenario 4)', async () => {
    const mockRepositories = [
      {
        id: '1',
        name: 'Repo 1',
        tribe: mockTribe.name,
        organization: 'Some Organization',
        coverage: '85%',
        codeSmells: 0,
        bugs: 0,
        vulnerabilities: 0,
        hotspots: 0,
        state: RepositoryState.Enable,
      },
    ];

    jest.spyOn(tribeRepository, 'findOneBy').mockResolvedValue(mockTribe);
    jest
      .spyOn(tribeRepository, 'createQueryBuilder')
      .mockReturnValue(mockCreateQueryBuilder(mockRepositories));

    jest
      .spyOn(service, 'fetchRepositoriesVerificationData')
      .mockImplementation(mockFetchRepositoriesVerificationData);

    const result = await service.getTribeRepositories('1');
    expect(result).toEqual({
      repositories: [
        {
          id: '1',
          name: 'Repo 1',
          tribe: 'Test Tribe',
          organization: 'Some Organization',
          coverage: '85%',
          codeSmells: 0,
          bugs: 0,
          vulnerabilities: 0,
          hotspots: 0,
          state: 'Habilitado',
          verificationState: 'Aprobado',
        },
      ],
    });
  });

  it('should get CSV data (ejercicio 4)', async () => {
    const mockRepositories = [
      {
        id: '1',
        name: 'Repo 1',
        tribe: mockTribe.name,
        organization: 'Some Organization',
        coverage: '85%',
        codeSmells: 0,
        bugs: 0,
        vulnerabilities: 0,
        hotspots: 0,
        state: RepositoryState.Enable,
      },
      {
        id: '2',
        name: 'Repo 2',
        tribe: mockTribe.name,
        organization: 'Some Organization',
        coverage: '80%',
        codeSmells: 0,
        bugs: 0,
        vulnerabilities: 0,
        hotspots: 0,
        state: RepositoryState.Enable,
      },
      {
        id: '3',
        name: 'Repo 3',
        tribe: mockTribe.name,
        organization: 'Some Organization',
        coverage: '76%',
        codeSmells: 0,
        bugs: 0,
        vulnerabilities: 0,
        hotspots: 0,
        state: RepositoryState.Enable,
      },
    ];

    jest.spyOn(tribeRepository, 'findOneBy').mockResolvedValue(mockTribe);
    jest
      .spyOn(tribeRepository, 'createQueryBuilder')
      .mockReturnValue(mockCreateQueryBuilder(mockRepositories));

    jest
      .spyOn(service, 'fetchRepositoriesVerificationData')
      .mockImplementation(mockFetchRepositoriesVerificationData);

    const result = await service.generateTribeRepositoriesCsv('1');
    expect(result)
      .toEqual(`Repository ID,Repository Name,Tribe Name,Organization Name,Coverage,Code Smells,Bugs,Vulnerabilities,Hotspots,Repository State,Verification State
1,Repo 1,Test Tribe,Some Organization,85%,,0,0,0,Habilitado,Aprobado
2,Repo 2,Test Tribe,Some Organization,80%,,0,0,0,Habilitado,En espera
3,Repo 3,Test Tribe,Some Organization,76%,,0,0,0,Habilitado,Verificado`);
  });
});
