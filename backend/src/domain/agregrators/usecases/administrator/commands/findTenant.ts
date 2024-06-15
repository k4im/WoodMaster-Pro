import { ISingleCommandInterface } from "../../Abstrations/ICoomands.interface";
import { Inject } from "@nestjs/common";
import { ITenantDto } from "src/application/dto/interfaces/ITenant.dto";
import ITenantRepository from "src/infrastructure/repository/abstraction/ITenantRepository.interface";

export default class findTenantByUuidUsecase implements ISingleCommandInterface<ITenantDto> {
    constructor(@Inject("ITenantRepository") private readonly repository: ITenantRepository) {}
    async execute(uuid: string, tenantId?: string): Promise<ITenantDto> {
        try {
            return await this.repository.findTenantByUuid(uuid.toString());
        } catch (error) {
            console.log(`Houve um erro ao buscar o tenant por uuid: ${error}`);
        }
    }
}