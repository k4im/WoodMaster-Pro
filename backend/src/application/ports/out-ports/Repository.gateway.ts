import { IResponse } from "src/domain/interfaces/IResponse.interface"

export interface RepositoryGateway { 
        paginarResultados(pagina: number, limit: number, tenantId?: string, filterType?: any): Promise<IResponse>;
        criarNovoRegistro(registro: any): Promise<boolean>;
        buscarPorUUID(uuid: string): Promise<any>;   
        atualizarRegistro(registro: any, uuid: string) : Promise<any>;
        deletarRegistro(uuid: string) : Promise<boolean>;
}