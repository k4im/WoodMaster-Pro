/**
 * Interface de repositorio
 * 
 * Interface para repositorio de administradores
 * poderá realizar operações de CRUD dentro do sistema
 * 
 * @author João Victor
 */

import { IAdmin } from "src/application/dto/interfaces/IAdm.dto";
import { IResponse } from "src/application/dto/interfaces/IResponse.interface";
import Administrator from "src/domain/entities/admin.domain.entity";

export interface IAdministratorRepository {
    getAdministrators(page: number, limit: number): Promise<IResponse<IAdmin>>;
    getAdministrator(uuid: string): Promise<IAdmin>;
    getAdministratorByEmail(email: string): Promise<IAdmin>;
    createAdministrator(admin: Administrator): Promise<boolean>;
    deactivateAdministrator(uuid: string): Promise<boolean>;
}