import { Inject, Injectable } from '@nestjs/common';
import { UpdatePessoaDto } from 'src/application/http-controllers/pessoas/dto/update-pessoa.dto';
import { PessoaRepositoryService } from 'src/infraestrutura/repository/pessoa-repository/pessoa-repository.service';
import { LoggerGateway } from 'src/application/out-ports/logger.gateway';

@Injectable()
export class AtualizarFuncionarioService {

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
            this.logger.log(`Executando caso de uso [Use Case] - [AtualizarFuncionario] - [Execute]`);
            let result = await this.pessoaRepo.atualizarRegistro(data, uuid);
            return result;
        } catch (error) {
            this.logger.error(`Não foi possivel efetuar a execução do caso de uso [Use Case] - [AtualizarFuncionario] - [Execute]: ${error}`);
        }
    }
}
