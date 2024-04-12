import { Pessoa } from '@prisma/client';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { DatabaseService } from 'src/outbound/database/database.service';
export declare class PessoaRepositoryService {
    private readonly databaseService;
    private readonly logger;
    constructor(databaseService: DatabaseService, logger: CustomLogger);
    criarNovaPessoa(pessoa: Pessoa): void;
}
