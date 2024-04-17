import { IResponse } from "src/interfaces/IResponse.interface";

export abstract class Repository { 
        paginarResultados(pagina: number, limit: number): Promise<IResponse> {
                return 
        };
        criarNovoRegistro(registro: any) {};
        buscarPorUUID(uuid: string): Promise<any> {
                return 
        };   
        atualizarRegistro(registro: any, uuid: string){};
        deletarRegistro(uuid: string){};
}