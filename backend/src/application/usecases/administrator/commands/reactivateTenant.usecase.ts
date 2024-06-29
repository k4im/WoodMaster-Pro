import { Inject } from "@nestjs/common";
import ITenantRepository from "src/infrastructure/repository/abstraction/ITenantRepository.interface";
import { ISimpleCommandInterface } from "../../Abstrations/ICoomands.interface";

export default class reactiveTenantUsecase implements ISimpleCommandInterface {
    constructor(@Inject("ITenantRepository") private readonly repository: ITenantRepository) { }
    async execute(uuid?: string): Promise<boolean> {
        return await this.repository.reactivateTenant(uuid);
    }


}