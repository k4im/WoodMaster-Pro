/**
 * Interface de repositorio
 * 
 * Interface para repositorio de administradores
 * poderá realizar operações de CRUD dentro do sistema
 * 
 * @author João Victor
 */

import { IResponse } from "src/application/dto/IResponse.interface";
import Administrator from "src/domain/entities/admin.domain.entity";

export interface IAdministratorRepository {
    getAdministrators(page: number, limit: number): Promise<IResponse<Administrator>>;
    getAdministrator(uuid: string): Promise<Administrator>;
    getAdministratorByEmail(email: string): Promise<Administrator>;
    createAdministrator(admin: Administrator): Promise<boolean>;
    deactivateAdministrator(uuid: string): Promise<boolean>;
}