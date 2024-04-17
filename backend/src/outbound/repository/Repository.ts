import { IPessoa } from "src/interfaces/IPessoa.interface";
import { IResponse } from "src/interfaces/IResponse.interface";

export abstract class Repository { 
        paginarResultados(pagina: number, limit: number): Promise<IResponse> {return};
        criarNovoRegistro(registro: any): Promise<boolean> {return};
        buscarPorUUID(uuid: string): Promise<any> {return};   
        atualizarRegistro(registro: any, uuid: string) : Promise<any> { return};
        deletarRegistro(uuid: string) : Promise<boolean> { return };
}