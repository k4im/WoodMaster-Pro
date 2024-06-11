import { IResponse } from "src/application/dto/interfaces/IResponse.interface";
import { ICommandInterfacePaginate } from "../../Abstrations/ICoomands.interface";
import { ParamsPaginate } from "../../Abstrations/ParamsPaginate.interface";
import { Inject } from "@nestjs/common";
import ITenantRepository from "src/infrastructure/repository/abstraction/ITenantRepository.interface";
import { ITenantDto } from "src/application/dto/interfaces/ITenant.dto";

export default class listTenantsUseCase implements ICommandInterfacePaginate<ParamsPaginate, IResponse<ITenantDto>> {
    constructor(@Inject("ITenantRepository") private readonly repository: ITenantRepository) {}
    
    async execute(data: ParamsPaginate): Promise<IResponse<ITenantDto>> {
        try {
            return await this.repository.paginatedTenants(data.page, data.limit);
        } catch (error) {
            console.log(`Houve um erro ao tentar realizar a operação: ${error}`)    
        }
    } 
}