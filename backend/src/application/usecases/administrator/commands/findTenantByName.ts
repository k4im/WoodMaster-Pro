import { IFindTenantByName } from "../../Abstrations/ICoomands.interface";
import { Inject } from "@nestjs/common";
import { ITenantDto } from "src/application/dto/interfaces/ITenant.dto";
import ITenantRepository from "src/infrastructure/repository/abstraction/ITenantRepository.interface";

export default class findTenantByNameUsecase implements IFindTenantByName<ITenantDto> {
    constructor(@Inject("ITenantRepository") private readonly repository: ITenantRepository) { }
    async execute(name: string): Promise<ITenantDto> {
        return await this.repository.findTenantByUuid(name);
    }


}