export interface BuscarResultadosUseCase {
    execute(pagina: number, limit: number): Promise<any>
}