import { Inject, Injectable } from '@nestjs/common';
import { LoggerGateway } from 'src/application/out-ports/logger.gateway';
import { IResponse } from 'src/domain/interfaces/IResponse.interface';
import { TenantRepositoryService } from 'src/infraestrutura/repository/tenant-repository/tenant-repository.service';

@Injectable()
export class ListarEstabelecimentosUseCase {

    constructor(
        private readonly tenantRepo: TenantRepositoryService,
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
