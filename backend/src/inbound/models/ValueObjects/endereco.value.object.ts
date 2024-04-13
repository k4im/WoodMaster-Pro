export class Endereco { 
    Logradouro : string        
    Complemento : string       
    Bairro: string            
    Caixapostal: string    
    Pais: string   
    Estado: string          
    Municipio: string        
    Cep: string 
    Enderecoprincipal: boolean 
    Observacoes: string
    TipoEndereco: string

    
    constructor(   
        logradouro? : string,       
        complemento? : string,       
        bairro?: string,     
        caixapostal?: string,    
        pais?: string,  
        estado?: string,          
        municipio?: string,        
        cep?: string, 
        enderecoprincipal?: boolean, 
        observacoes?: string,
        tipoEndereco?: string) {
        this.Logradouro = logradouro,
        this.Complemento = complemento,
        this.Bairro = bairro,
        this.Caixapostal = caixapostal,
        this.Pais = pais,
        this.Estado = estado,
        this.Municipio = municipio,
        this.Cep = cep,
        this.Enderecoprincipal = enderecoprincipal,
        this.Observacoes = observacoes,
        this.TipoEndereco = tipoEndereco
    }

    default() {
        let endereco: Endereco = new Endereco(
            "Caixa",
            "Perto do fatal",
            "Vila maria",
            "Caixa postal",
            "Brasil",
            "SC",
            "Blumenau",
            "88525820",
            true,
            "Teste",
            "Casa"
        );
        return endereco;
    }
}