import { ApiProperty } from "@nestjs/swagger";

export class TenantDoc {

    @ApiProperty()
    uuid: String

    @ApiProperty()
    Nome: String

    @ApiProperty()
    Inativo: Boolean

}