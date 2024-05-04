export interface IResponse<T> { 
    total_itens: number,
    total_paginas: number
    pagina_atual: number,
    resultados: T[]
}