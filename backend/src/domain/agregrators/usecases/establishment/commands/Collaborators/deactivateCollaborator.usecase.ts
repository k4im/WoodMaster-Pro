import { Inject } from "@nestjs/common";
import IPersonRepository from "src/infrastructure/repository/abstraction/IPersonRepository.interface";
import { ISingleCommandInterface } from "../../../Abstrations/ICoomands.interface";

export default class deactivateCollaboratorUseCase implements ISingleCommandInterface<boolean> {
    constructor(
        @Inject("IPersonRepository") private readonly personRepository: IPersonRepository) { }

     async execute(uuid: string): Promise<boolean> {
        try {
            const result = await this.personRepository.deactivePerson(uuid);
            return result;
        } catch (error) {
           console.log(`Houve um erro: ${error}`); 
        }
    }
    
}