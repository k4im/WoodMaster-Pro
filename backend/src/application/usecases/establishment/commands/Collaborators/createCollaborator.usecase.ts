import CollaboratorDto from "src/application/dto/collaborator.dto";
import { ICommandInterface } from "../Abstrations/ICoomands.interface";

export default class createCollaboratorUseCase implements ICommandInterface<CollaboratorDto> {
    
    execute(data: CollaboratorDto): Promise<boolean> {
        throw new Error("Method not implemented.");
    } 

}