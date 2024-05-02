import { Inject, Injectable } from '@nestjs/common';
import { PessoaRepositoryService } from 'src/adapters/persistence/repository/pessoa-repository/pessoa-repository.service';
import { LoggerGateway } from 'src/ports/out-ports/logger.gateway';
import { UpdatePessoaDto } from 'src/application/controllers/http-controllers/pessoas/dto/update-pessoa.dto';

@Injectable()
export class AtualizarClienteUseCase {
    
    constructor(private readonly pessoaRepo: PessoaRepositoryService,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) {}
    
    /**
     * O metodo será utilizado para execução do processo de atualização do banco de dados.
     * @param uuid recebe o uuid do cliente para efetuar a atualização.
     * @param data Recebe o data para efetuar a atualização no banco.
     * @returns PessoaEntity
     */
    async execute(data: UpdatePessoaDto, uuid: string) {
        try {
            this.logger.log(`Executando caso de uso [Use Case] - [AtualizarCliente] - [Execute]`);
            let result = await this.pessoaRepo.atualizarRegistro(data, uuid);
            return result;
        } catch (error) {
            this.logger.error(`Não foi possivel efetuar a execução do use case de atualizar de cliente [Use Case] - [AtualizarCliente] - [Execute]: ${error}`);
        }
    }
}
