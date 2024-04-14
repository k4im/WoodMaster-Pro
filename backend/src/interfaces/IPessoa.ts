import { Email } from "src/inbound/models/ValueObjects/email.value.object";
import { Endereco } from "src/inbound/models/ValueObjects/endereco.value.object";
import { Telefone } from "src/inbound/models/ValueObjects/telefone.value.object";

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

    PessoaTelefone: Telefone[]

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