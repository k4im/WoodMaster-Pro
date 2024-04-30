import { Inject, Injectable } from '@nestjs/common';
import { PessoaEntity } from 'src/core/models/entities/pessoa.entity';
import { CriarPessoaDto } from 'src/inbound/http-controllers/pessoas/dto/criar-pessoa.dto';
import { PessoaRepositoryService } from 'src/outbound/adapters/repository/pessoa-repository/pessoa-repository.service';
import { LoggerGateway } from 'src/outbound/ports/logger.gateway';

@Injectable()
export class CriarFuncionarioService {

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
