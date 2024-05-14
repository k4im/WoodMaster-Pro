import CollaboratorDto from "src/application/dto/collaborator.dto";
import { ISimpleCommandInterface } from "../Abstrations/ICoomands.interface";

export default class createCollaboratorUseCase implements ISimpleCommandInterface {
    
     execute(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}