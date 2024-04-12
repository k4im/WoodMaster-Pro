export class Endereco { 
    Logradouro : string        
    Complemento : string       
    Bairro: string            
    Caixapostal: string    
    Pais: string   
    Estado: string          
    Municipio: string        
    Cep: string 
    Enderecoprincipal: string 
    Observacoes: string
    TipoEndereco: string

    constructor(endereco: Endereco) {
        this.Logradouro = endereco.Logradouro,
        this.Complemento = endereco.Complemento,
        this.Bairro = endereco.Bairro,
        this.Caixapostal = endereco.Caixapostal,
        this.Pais = endereco.Pais,
        this.Estado = endereco.Estado,
        this.Municipio = endereco.Municipio,
        this.Cep = endereco.Cep,
        this.Enderecoprincipal = endereco.Enderecoprincipal,
        this.Observacoes = endereco.Observacoes,
        this.TipoEndereco = endereco.TipoEndereco
    }
}