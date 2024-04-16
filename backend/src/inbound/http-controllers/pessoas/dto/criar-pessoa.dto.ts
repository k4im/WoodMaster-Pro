import { randomUUID } from "crypto";
import { Email } from "../entities/ValueObjects/email.value.object";
import { Endereco } from "../entities/ValueObjects/endereco.value.object";
import { Telefone } from "../entities/ValueObjects/telefone.value.object";
import { ApiProperty } from "@nestjs/swagger";

export class CriarPessoaDto {
    
    @ApiProperty()
    Nome: string;
    @ApiProperty()
    Matricula: string | null;
    @ApiProperty()
    Codigo: number | null;
    @ApiProperty()
    Datainclusao: Date;
    @ApiProperty()
    Inativo: boolean;
    @ApiProperty()
    Estrangeiro: boolean;
    
    @ApiProperty()
    Email: Email;
    @ApiProperty({type: Endereco})
    PessoaEndereco: Endereco[]

    @ApiProperty({type: Telefone})
    PessoaTelefones: Telefone[]

    @ApiProperty()
    Cliente: boolean;
    @ApiProperty()
    Colaborador: boolean;
    @ApiProperty()
    Fornecedor: boolean;
    @ApiProperty()
    Tipopj: boolean;
    
    @ApiProperty()
    Datanascimento: Date;
    
    @ApiProperty()
    Pai: string | null;
    @ApiProperty()
    Mae: string | null;
    @ApiProperty()
    Sexo: string| null; 
    
    @ApiProperty()
    Rg: string | null;
    @ApiProperty()
    Emissor: string | null;
    @ApiProperty()
    Ufemissor: string  | null; 
    @ApiProperty()
    Datarg: Date | null;
    @ApiProperty()
    Cpf: string;
    @ApiProperty()
    Ctps: string | null;
    @ApiProperty()
    Datactps: Date | null;
    @ApiProperty()
    Nrpis: string | null;
    @ApiProperty()
    Datapis: Date | null;
    @ApiProperty()
    Regprofnumero: string | null;
    @ApiProperty()
    Conselho: string | null;  
    @ApiProperty()
    Ufconselho: string | null; 
    @ApiProperty()
    Regprofserie: string | null;
    
    @ApiProperty()
    Profissao: string | null; 
    @ApiProperty()
    Dependentes: number | null;
    @ApiProperty()
    Razaosocial: string | null;
    @ApiProperty()
    Cnpj: string | null;
    @ApiProperty()
    Inscricaoestadual: string | null;
    @ApiProperty()
    Inscricaomunicipal: string | null;
    @ApiProperty()
    Objetosocial: string | null; 
    @ApiProperty()
    Observacoes: string | null;
    
    // Construturo atualmente encontra-se apenas com os campos minimos para serem criado
    // sendo necessário futuramente estar realizando refinamento deste DTO.
    constructor(        
        nome?: string,
        email?: Email,
        codigo?: number,
        cliente?: boolean,
        colaborador?: boolean,
        fornecedor?: boolean,
        pessoaEndereco?: Endereco[],
        pessoaTelefone?: Telefone[],
        observacoes?: string) {
            
            this.Nome = nome,
            this.Inativo = false,
            this.Email = email,
            this.Codigo = codigo,
            this.Cliente = cliente,
            this.Colaborador = colaborador,
            this.Fornecedor = fornecedor,
            this.PessoaEndereco = pessoaEndereco,
            this.PessoaTelefones = pessoaTelefone,
            this.Observacoes = observacoes
    }
    
}
