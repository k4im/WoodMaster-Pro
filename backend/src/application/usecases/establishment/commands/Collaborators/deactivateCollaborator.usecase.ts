import { Inject } from "@nestjs/common";
import { ISingleCommandInterface } from "src/application/usecases/Abstrations/ICoomands.interface";
import IPersonRepository from "src/infrastructure/repository/abstraction/IPersonRepository.interface";

export default class createCollaboratorUseCase implements ISingleCommandInterface<boolean> {
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