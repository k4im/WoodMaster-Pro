import { IFindTenantByName } from "../../Abstrations/ICoomands.interface";
import { Inject } from "@nestjs/common";
import { ITenantDto } from "src/application/dto/ITenant.dto";
import ITenantRepository from "src/infrastructure/repository/abstraction/ITenantRepository.interface";

export default class findTenantByNameUsecase implements IFindTenantByName<ITenantDto> {
    constructor(@Inject("ITenantRepository") private readonly repository: ITenantRepository) {}
    async execute(name: string): Promise<ITenantDto> {
        try {
            return await this.repository.findTenantByUuid(name);
        } catch (error) {
            console.log(`Houve um erro ao buscar o tenant por uuid: ${error}`);
        }
    }
    

}