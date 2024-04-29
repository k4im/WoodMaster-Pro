import { Inject, Injectable } from '@nestjs/common';
import { PessoaEntity } from 'src/core/models/entities/pessoa.entity';
import { CriarPessoaDto } from 'src/inbound/http-controllers/pessoas/dto/criar-pessoa.dto';
import { LoggerGateway } from 'src/outbound/logger/logger.gateway';
import { PessoaRepositoryService } from 'src/outbound/repository/pessoa-repository/pessoa-repository.service';

@Injectable()
export class CriarNovoClienteService {

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
