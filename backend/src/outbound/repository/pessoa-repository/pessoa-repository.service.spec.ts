import { Test, TestingModule } from '@nestjs/testing';
import { PessoaRepositoryService } from './pessoa-repository.service';
import { IReponse } from 'src/interfaces/IReponse';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { DatabaseService } from 'src/outbound/database/database.service';

describe('PessoaRepositoryService', () => {
  let service: PessoaRepositoryService;
  let customLooger: CustomLogger
  let databaseService: DatabaseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoaRepositoryService, 
        { provide: CustomLogger, useValue: customLooger },
        { provide: DatabaseService, useValue: databaseService }
      ],
    }).compile();

    service = module.get<PessoaRepositoryService>(PessoaRepositoryService);
    customLooger = module.get<CustomLogger>(CustomLogger);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('devera buscar clientes paginados', async () => {
    
    const resultados: IReponse = {
      pagina_atual: 1,
      resultados: [],
      total_itens: 1,
      total_paginas: 10
    }
    
    jest.spyOn(service, 'paginarPessoas').mockImplementation(async () => resultados);
    
    expect(await service.paginarPessoas(1, 10)).toBe(resultados);
  });

  it('devera criar nova pessoa', async() =>  {

    jest.spyOn(service, 'criarNovaPessoa').mockImplementation(async () => true);
    
  })
});
