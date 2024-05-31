import { Inject } from "@nestjs/common";
import { IResponse } from "src/application/dto/IResponse.interface";
import { IPersonDto } from "src/application/dto/Person.dto";
import { filter } from "src/application/enum/filter.enum";
import { ICommandInterfacePaginate } from "src/application/usecases/Abstrations/ICoomands.interface";
import { ParamsPaginate } from "src/application/usecases/Abstrations/ParamsPaginate.interface";
import IPersonRepository from "src/infrastructure/repository/abstraction/IPersonRepository.interface";

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