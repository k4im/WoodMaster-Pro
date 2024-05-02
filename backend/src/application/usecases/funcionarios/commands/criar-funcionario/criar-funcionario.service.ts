import { Inject, Injectable } from '@nestjs/common';
import { PessoaEntity } from 'src/domain/entities/pessoa.entity';
import { PessoaRepositoryService } from 'src/adapters/persistence/repository/pessoa-repository/pessoa-repository.service';
import { LoggerGateway } from 'src/ports/out-ports/logger.gateway';
import { CriarPessoaDto } from 'src/application/controllers/http-controllers/pessoas/dto/criar-pessoa.dto';

@Injectable()
export class CriarFuncionarioUseCase {

    constructor(
        private readonly pessoaRepo: PessoaRepositoryService,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) {}
    
    /**
     * Caso de uso podera ser utilizado para remover um fonecedor de um determinado tenant.
     * @param uuid recebe o uuid do fornecedor
     * @param tenantId recebe o uuid do tenant logado atualmente.
     * @returns true | false
     */
    async execute(data: CriarPessoaDto) {
        try {
            this.logger.log(`Executando caso de uso [Use Case] - [CriarNovoFuncionario] - [Execute]`);
            const pessoa = new PessoaEntity().criarPessoaPorDto(data);
            pessoa.Colaborador = true
            return await this.pessoaRepo.criarNovoRegistro(pessoa);
        } catch (error) {
            this.logger.error(`Não foi possivel efetuar a execução do use case [Use Case] - [CriarNovoFuncionario] - [Execute]: ${error}`);
        }
    }
}
