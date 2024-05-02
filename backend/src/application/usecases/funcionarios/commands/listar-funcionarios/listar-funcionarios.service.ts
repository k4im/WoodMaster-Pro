import { Inject, Injectable } from '@nestjs/common';
import { filtro } from 'src/domain/enum/filtroPaginacao.enum';
import { LoggerGateway } from 'src/ports/out-ports/logger.gateway';
import { RepositoryGateway } from 'src/ports/out-ports/Repository.gateway';

@Injectable()
export class BuscarFuncionariosUseCase {

    constructor(
        @Inject("PessoaGateway")
        private readonly pessoaRepo: RepositoryGateway,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) {}
    
    /**
     * Executa a operação de busca de clientes paginados no banco de dados.
     * 
     * @param pagina Recebe a pagina para que seja repassada para o repository
     * @param limit Recebe o limite que será utilizado para apresentação dos dados.
     * @param tenantId Recebe o TenantId ao qual o cliente pertencente.
     * @returns retorna uma lista contendo todos os clientes para aquele tenantId
     */
    async execute(pagina: number, limit: number, tenantId: string) {
        try {
            this.logger.log(`Executando caso de uso [Use Case] - [ListarFuncionarios] - [Execute]`);
            let result = await this.pessoaRepo.paginarResultados(pagina, limit, tenantId, filtro.colaborador);
            return result;
        } catch (error) {
            this.logger.error(`Não foi possivel efetuar a execução do caso de uso [Use Case] - [ListarFuncionarios] - [Execute]: ${error}`);
        }
    }
}
