import { Inject, Injectable } from '@nestjs/common';
import { PessoaEntity } from 'src/domain/entities/pessoa.entity';
import { CriarPessoaDto } from 'src/application/http-controllers/pessoas/dto/criar-pessoa.dto';
import { PessoaRepositoryService } from 'src/infraestrutura/repository/pessoa-repository/pessoa-repository.service';
import { LoggerGateway } from 'src/application/out-ports/logger.gateway';

@Injectable()
export class CriarFornecedorService {

    constructor(
        private readonly pessoaRepo: PessoaRepositoryService,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) {}
    
    /**
     * Caso de uso poderá ser utilizado para criação de um novo fornecedor.
     * @param pessoaDto recebe um dto para efetuar a criação de um novo cliente.
     * @returns true | false
     */
    async execute(pessoaDto: CriarPessoaDto) {
        try {
            this.logger.log(`Executando caso de uso [Use Case] - [CriarFornecedor] - [Execute]`);
            let pessoa = new PessoaEntity().criarPessoaPorDto(pessoaDto)
            pessoa.Fornecedor = true;
            return await this.pessoaRepo.criarNovoRegistro(pessoa);
        } catch (error) {
            this.logger.error(`Não foi possivel efetuar a execução do use case de criar cliente [Use Case] - [CriarFornecedor] - [Execute]: ${error}`);
        }
    }

}
