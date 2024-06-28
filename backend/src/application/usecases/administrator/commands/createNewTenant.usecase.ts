import { ICommandInterface } from "../../Abstrations/ICoomands.interface";
import { Inject } from "@nestjs/common";
import { newTenantDto } from "src/application/dto/interfaces/ITenant.dto";
import TenantDomainEntity from "src/domain/entities/tenant.domain";
import ITenantRepository from "src/infrastructure/repository/abstraction/ITenantRepository.interface";

export default class createNewTenantUsecase implements ICommandInterface<newTenantDto> {
    constructor(@Inject("ITenantRepository") private readonly repository: ITenantRepository) { }

    async execute(data: newTenantDto): Promise<boolean> {
        const tenant = new TenantDomainEntity(data.Name, data.Email, data.Password)
        return await this.repository.createTenant(tenant);
    }

}