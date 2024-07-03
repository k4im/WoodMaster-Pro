/**
 * Classe utilizada para realizar a passagem de
 * subjects para o CALJS.
 *  
 * @author João Victor.
 * 
 */
import { IUserDto } from "./interfaces/IUser.dto";

export class UserFindDto implements IUserDto {
    Uuid: string;
    Email: string;
    IsActive: boolean;
    Role: string;
    Hash?: string;
    Tenant?: string;
    Permissions: string[];
}