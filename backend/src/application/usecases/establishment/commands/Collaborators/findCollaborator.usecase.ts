import CollaboratorDto from "src/application/dto/collaborator.dto";
import { ISingleCommandInterface } from "../Abstrations/ICoomands.interface";

export default class findCollaboratorUseCase implements ISingleCommandInterface<CollaboratorDto> {
    
    execute(uuid: string): Promise<CollaboratorDto> {
        throw new Error("Method not implemented.");
    }



}