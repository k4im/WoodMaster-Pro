import { Inject, Injectable } from '@nestjs/common';
import { LoggerGateway } from 'src/ports/out-ports/logger.gateway';
import { IResponse } from 'src/domain/interfaces/IResponse.interface';
import { RepositoryGateway } from 'src/ports/out-ports/Repository.gateway';
import { BuscarResultadosUseCase } from 'src/ports/in-ports/buscarResultadosUseCase.gateway';

@Injectable()
export class ListarEstabelecimentosUseCase implements BuscarResultadosUseCase{

    constructor(
        @Inject("EstabelecimentosGateway")
        private readonly tenantRepo: RepositoryGateway,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ) {}

    async execute(pagina: number, limit: number) { 
        try {
            this.logger.log("Executando caso de uso [Use Case] - [ListarEstabelecimentos] - [Execute]");
            const listaDeEstabelecimentos: IResponse = await this.tenantRepo.paginarResultados(pagina, limit);
            return listaDeEstabelecimentos;
        } catch (error) {
            this.logger.error(`Erro ao executar caso de uso [Use Case] - [ListarEstabelecimentos] - [Execute]: ${error}`)
        }  
    } 
}
