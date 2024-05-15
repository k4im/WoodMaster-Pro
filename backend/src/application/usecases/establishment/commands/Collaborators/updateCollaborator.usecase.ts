import CollaboratorDto from "src/application/dto/collaborator.dto";
import { ICommandInterface } from "../../../Abstrations/ICoomands.interface";

export default class updateCollaboratorUseCase implements ICommandInterface<CollaboratorDto> {
    
    execute(data: CollaboratorDto): Promise<boolean> {
        throw new Error("Method not implemented.");
    } 

}