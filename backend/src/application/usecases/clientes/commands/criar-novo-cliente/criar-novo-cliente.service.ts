import { Inject, Injectable } from '@nestjs/common';
import { PessoaEntity } from 'src/domain/entities/pessoa.entity';
import { PessoaRepositoryService } from 'src/adapters/persistence/repository/pessoa-repository/pessoa-repository.service';
import { LoggerGateway } from 'src/ports/out-ports/logger.gateway';
import { CriarPessoaDto } from 'src/application/controllers/http-controllers/pessoas/dto/criar-pessoa.dto';

@Injectable()
export class CriarClienteUseCase {

    constructor(
        private readonly pessoaRepo: PessoaRepositoryService,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) {}
    
    /**
     * Caso de uso poderá ser utilizado para criação de um novo cliente.
     * @param pessoaDto recebe um dto para efetuar a criação de um novo cliente.
     * @returns true | false
     */
    async execute(pessoaDto: CriarPessoaDto) {
        try {
            this.logger.log(`Executando caso de uso [Use Case] - [CriarCliente] - [Execute]`);
            let pessoa = new PessoaEntity().criarPessoaPorDto(pessoaDto)
            pessoa.Cliente = true;
            return await this.pessoaRepo.criarNovoRegistro(pessoa);
        } catch (error) {
            this.logger.error(`Não foi possivel efetuar a execução do use case de criar cliente [Use Case] - [CriarCliente] - [Execute]: ${error}`);
        }
    }

}
