/**
 * Swagger doc.
 * 
 * Classe utilizada para realizar a documentação
 * de um novo tenant dentro do swagger.
 * @author João Victor.
 */

import { ApiProperty } from "@nestjs/swagger";
import { newTenantDto } from "src/application/dto/interfaces/ITenant.dto";

export class tenantSwaggerDocs implements newTenantDto {
    @ApiProperty()
    Name: string;
}