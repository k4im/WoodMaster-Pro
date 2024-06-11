import { Inject } from "@nestjs/common";

import { filter } from "src/application/enum/filter.enum";
import IPersonRepository from "src/infrastructure/repository/abstraction/IPersonRepository.interface";
import { ICommandInterfacePaginate } from "../../../Abstrations/ICoomands.interface";
import { ParamsPaginate } from "../../../Abstrations/ParamsPaginate.interface";
import { IPersonDto } from "src/application/dto/interfaces/Person.dto";
import { IResponse } from "src/application/dto/interfaces/IResponse.interface";

export default class PaginateCollaboratorsUseCase implements ICommandInterfacePaginate<ParamsPaginate, IResponse<IPersonDto>>  {
    constructor(
        @Inject("IPersonRepository") private readonly personRepository: IPersonRepository) { }

    async execute(data: ParamsPaginate): Promise<IResponse<IPersonDto>> {
        try {
            const result = await this.personRepository.paginateResults(data.page, data.limit, data.tenantId, filter.collaborator);
            return result;
        } catch (error) {
            console.log(`Houve um erro: ${error}`);
        }
    }
}