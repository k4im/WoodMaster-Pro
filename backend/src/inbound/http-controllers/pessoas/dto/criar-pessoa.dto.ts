import { randomUUID } from "crypto";
import { Email } from "../entities/ValueObjects/email.value.object";
import { Endereco } from "../entities/ValueObjects/endereco.value.object";
import { Telefone } from "../entities/ValueObjects/telefone.value.object";

export class CriarPessoaDto {
    Nome: string;
    Matricula: string | null;
    Codigo: number | null;
    Datainclusao: Date;
    Inativo: boolean;
    Estrangeiro: boolean;
    
    Email: Email;
    PessoaEndereco: Endereco[]

    PessoaTelefones: Telefone[]

    Cliente: boolean;
    Colaborador: boolean;
    Fornecedor: boolean;
    Tipopj: boolean;
    
    Datanascimento: Date;
    
    Pai: string | null;
    Mae: string | null;
    Sexo: string| null; 
    
    Rg: string | null;
    Emissor: string | null;
    Ufemissor: string  | null; 
    Datarg: Date | null;
    Cpf: string;
    Ctps: string | null;
    Datactps: Date | null;
    Nrpis: string | null;
    Datapis: Date | null;
    Regprofnumero: string | null;
    Conselho: string | null;  
    Ufconselho: string | null; 
    Regprofserie: string | null;
    
    Profissao: string | null; 
    Dependentes: number | null;
    Razaosocial: string | null;
    Cnpj: string | null;
    Inscricaoestadual: string | null;
    Inscricaomunicipal: string | null;
    Objetosocial: string | null; 
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
