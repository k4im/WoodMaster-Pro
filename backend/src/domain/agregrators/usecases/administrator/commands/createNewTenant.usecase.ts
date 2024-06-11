import { ICommandInterface } from "../../Abstrations/ICoomands.interface";
import { Inject } from "@nestjs/common";
import { newTenantDto } from "src/application/dto/interfaces/ITenant.dto";
import ITenantRepository from "src/infrastructure/repository/abstraction/ITenantRepository.interface";

export default class createNewTenantUsecase implements ICommandInterface<newTenantDto> {
    constructor(@Inject("ITenantRepository") private readonly repository: ITenantRepository) {}
    
    async execute(data: newTenantDto): Promise<boolean> {
        try {
            return await this.repository.createTenant(data);
        } catch (error) {
            console.log(`Houve um erro ${error}`);
        }
    }

}