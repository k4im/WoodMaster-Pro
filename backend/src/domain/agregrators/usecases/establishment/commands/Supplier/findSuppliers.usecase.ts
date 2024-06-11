import { Inject, Injectable } from "@nestjs/common";
import { ICommandInterfacePaginate } from "../../../Abstrations/ICoomands.interface";
import { ParamsPaginate } from "../../../Abstrations/ParamsPaginate.interface";
import { IResponse } from "src/application/dto/interfaces/IResponse.interface";
import { IPersonDto } from "src/application/dto/interfaces/Person.dto";
import IPersonRepository from "src/infrastructure/repository/abstraction/IPersonRepository.interface";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { filter } from "src/application/enum/filter.enum";

@Injectable()
export default class FindSupplierUseCase implements ICommandInterfacePaginate<ParamsPaginate, IResponse<IPersonDto>> {
    
    constructor(
        @Inject("IPersonRepository")
        private readonly repo: IPersonRepository,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ) {}

    /**
     * Executa o caso de uso de paginação de supplier.
     * @param data para paginação. 
     * @returns 
     */
    execute(data: ParamsPaginate): Promise<IResponse<IPersonDto>> {
        try {
            return this.repo.paginateResults(data.page, data.limit, data.tenantId, filter.supplier);
        } catch (error) {
            this.logger.error(`Houve um erro ao paginar suppliers usecase: ${error}`);
        }
    }

}