/**
 * Classe utilizada para realizar a operaçao de 
 * passagem de dados em chamdas HTTP além de apresentação
 * dos schemas dentro do swagger.
 * 
 * A mesma classe encontra-se também sendo utilizada
 * para realizar a passagem de subjects do CASLJS.
 * 
 * @author João Victor.
 * 
 */
import { IsNotEmpty } from "class-validator";
import { DomainEntity } from "../../domain/types/entity.type";
import { newTenantDto } from "./interfaces/ITenant.dto";

export class TenantDto extends DomainEntity implements newTenantDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
    constructor() {
        super()
        this.name = 'TenantDto'
    }
}