import { Inject, Injectable } from '@nestjs/common';
import { filtro } from 'src/core/enum/filtroPaginacao.enum';
import { PessoaRepositoryService } from 'src/outbound/adapters/repository/pessoa-repository/pessoa-repository.service';
import { LoggerGateway } from 'src/outbound/ports/logger.gateway';

@Injectable()
export class ListarFornecedoresService {

    constructor(private readonly pessoaRepo: PessoaRepositoryService,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) {}
    
    /**
     * Executa a operação de busca de fornecedores paginados no banco de dados.
     * 
     * @param pagina Recebe a pagina para que seja repassada para o repository
     * @param limit Recebe o limite que será utilizado para apresentação dos dados.
     * @param tenantId Recebe o TenantId ao qual o cliente pertencente.
     * @returns retorna uma lista contendo todos os fornecedores para aquele tenantId
     */
    async execute(pagina: number, limit: number, tenantId: string) {
        try {
            this.logger.log(`Executando caso de uso [Use Case] - [ListarFornecedores] - [Execute]`);
            let result = await this.pessoaRepo.paginarResultados(pagina, limit, tenantId, filtro.fornecedor);
            return result;
        } catch (error) {
            this.logger.error(`Não foi possivel efetuar a execução do use case [Use Case] - [ListarFornecedores] - [Execute]: ${error}`);
        }
    }
}
