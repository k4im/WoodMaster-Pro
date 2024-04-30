import { Email } from "../../domain/valueObjects/email.value.object";
import { Endereco } from "../../domain/valueObjects/endereco.value.object";
import { Telefone } from "../../domain/valueObjects/telefone.value.object";

export interface IPessoa {
    Uuid: string;
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

}