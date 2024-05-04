import { ApiProperty } from "@nestjs/swagger"

export class Address { 
    @ApiProperty()
    StreetName : string        
    @ApiProperty()
    City : string       
    @ApiProperty()
    Neighborhood: string            
    @ApiProperty()
    ZipCode: string    
    @ApiProperty()
    Country: string   
    @ApiProperty()
    State: string          
    @ApiProperty()
    IsPrimary: boolean 
    @ApiProperty()
    Observations: string

    constructor(   
        streetName? : string,       
        city? : string,       
        neighborhood?: string,     
        zipCode?: string,    
        country?: string,  
        state?: string,          
        isPrimary?: boolean,        
        observations?: string) {
            this.StreetName = streetName;
            this.City = city;
            this.Neighborhood = neighborhood;
            this.ZipCode = this.cleanZipCode(zipCode);
            this.Country = country;
            this.State = state;
            this.IsPrimary = isPrimary;
            this.Observations = observations
    }
    /**
     * Retorna um novo endereço com as configurações padrões.
     * Este metodo poderá ser utilizado para facilitação de criação de testes.
     * @returns Endereco
     */
    default() {
        let endereco: Address = new Address("StreetName", "City", "NeighborHood", "88", "US", "NY", false, "");
        return endereco;
    }
    
    /**
     * O metodo sera utilizado para efetuar a limpeza dos dados de zipcode informado.
     * @param zipcode Recebe o zipcode para efetuar a limepza do mesmo
     * @returns Zipcode
     */
    private cleanZipCode(zipcode: string) {
        var cleanZipCode = zipcode.replace("-", "").replace(".", "");
        return this.validateZipCode(cleanZipCode);
    }

    /**
     * Efetua a validação do zipcode informado no momento de criação do objeto.
     * @param zipcode Recebe o zipCode para efetuar a validação
     * @returns Zipcode | Error 
     */
    private validateZipCode(zipcode: string) {
        var regexp = /\d\d((\d\d\d)|(\.\d\d\d-))\d\d\d/;
        if (regexp.test(zipcode)) return zipcode
        throw new Error("O CEP informado é invalido.")
    }
}