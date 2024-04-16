import { IResponse } from "src/interfaces/IResponse.interface";

export abstract class Repository { 
        paginarResultados(pagina: number, limit: number) {};
        criarNovoRegistro(registro: any) {};
        buscarPorUUID(uuid: string){};   
        atualizarRegistro(registro: any, uuid: string){};
        deletarRegistro(uuid: string){};
}