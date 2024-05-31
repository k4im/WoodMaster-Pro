import { Inject } from "@nestjs/common";
import ITenantRepository from "src/infrastructure/repository/abstraction/ITenantRepository.interface";
import { ISimpleCommandInterface } from "../../Abstrations/ICoomands.interface";

export default class deactiveTenantUsecase implements ISimpleCommandInterface {
    constructor(@Inject("ITenantRepository") private readonly repository: ITenantRepository) { }
    async execute(uuid?: string): Promise<boolean> {
        try {
            return await this.repository.deactiveTenant(uuid);
        } catch (error) {
            console.log(`Houve um erro: ${error}`)
        }
    }


}