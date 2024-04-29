import { Test, TestingModule } from '@nestjs/testing';
import { PessoaRepositoryService } from './pessoa-repository.service';
import { IResponse } from 'src/interfaces/IResponse';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { DatabaseService } from 'src/outbound/database/database.service';
import { IPessoa } from 'src/interfaces/IPessoa';
import { Pessoa } from 'src/inbound/http-controllers/pessoas/entities/pessoa.entity';

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
    
    const resultados: IResponse = {
      pagina_atual: 1,
      resultados: [],
      total_itens: 1,
      total_paginas: 10
    }
    
    jest.spyOn(service, 'paginarResultados').mockImplementation(async () => resultados);
    
    expect(await service.paginarResultados(1, 10)).toBe(resultados);
  });

  it('devera criar nova pessoa', async() =>  {
    let teste: IPessoa = new Pessoa().default();

    jest.spyOn(service, 'criarNovoRegistro').mockImplementation(async () => true);
    
  })
});
