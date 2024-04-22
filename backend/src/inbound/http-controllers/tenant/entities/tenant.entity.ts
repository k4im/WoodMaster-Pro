import { PessoaEntity } from "../../pessoas/entities/pessoa.entity"
import { Usuario } from "../../usuarios/entities/usuario.entity"

export class Tenant {
    Nome: string

    constructor(nome? :string) {
        this.Nome = nome
    }
}
