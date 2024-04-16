import { ApiProperty } from "@nestjs/swagger"

export class Endereco { 
    @ApiProperty()
    Logradouro : string        
    @ApiProperty()
    Complemento : string       
    @ApiProperty()
    Bairro: string            
    @ApiProperty()
    Caixapostal: string    
    @ApiProperty()
    Pais: string   
    @ApiProperty()
    Estado: string          
    @ApiProperty()
    Municipio: string        
    @ApiProperty()
    Cep: string 
    @ApiProperty()
    Enderecoprincipal: boolean 
    @ApiProperty()
    Observacoes: string

    
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
        observacoes?: string) {
        this.Logradouro = logradouro,
        this.Complemento = complemento,
        this.Bairro = bairro,
        this.Caixapostal = caixapostal,
        this.Pais = pais,
        this.Estado = estado,
        this.Municipio = municipio,
        this.Cep = cep,
        this.Enderecoprincipal = enderecoprincipal,
        this.Observacoes = observacoes
    }
    /**
     * Retorna um novo endereço com as configurações padrões.
     * Este metodo poderá ser utilizado para facilitação de criação de testes.
     * @returns Endereco
     */
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
            "Teste"
        );
        return endereco;
    }
}