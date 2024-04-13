import { UUID, randomUUID } from "crypto";
import { Email } from "./ValueObjects/email.value.object";
import { Endereco } from "./ValueObjects/endereco.value.object";
import { Telefone } from "./ValueObjects/telefone.value.object";


export class Pessoa {
    Uuid: string = randomUUID();
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
  
    constructor(
        Nome: string,
        Matricula: string | null,
        Codigo: number | null,
        Datainclusao: Date,
        Inativo: boolean,
        Estrangeiro: boolean,
        Email: Email,
        PessoaEndereco: Endereco[],
        PessoaTelefone: Telefone[],
        Cliente: boolean,
        Colaborador: boolean,
        Fornecedor: boolean,
        Tipopj: boolean,
        Datanascimento: Date,
        Pai: string | null,
        Mae: string | null,
        Sexo: string | null,
        Rg: string | null,
        Emissor: string | null,
        Ufemissor: string | null,
        Datarg: Date | null,
        Cpf: string,
        Ctps: string | null,
        Datactps: Date | null,
        Nrpis: string | null,
        Datapis: Date | null,
        Regprofnumero: string | null,
        Conselho: string | null,
        Ufconselho: string | null,
        Regprofserie: string | null,
        Profissao: string | null,
        Dependentes: number | null,
        Razaosocial: string | null,
        Cnpj: string | null,
        Inscricaoestadual: string | null,
        Inscricaomunicipal: string | null,
        Objetosocial: string | null,
        Observacoes: string | null
    ) {
        this.Nome = Nome;
        this.Matricula = Matricula;
        this.Codigo = Codigo;
        this.Datainclusao = Datainclusao;
        this.Inativo = Inativo;
        this.Estrangeiro = Estrangeiro;
        this.Email = Email;
        this.PessoaEndereco = PessoaEndereco;
        this.PessoaTelefone = PessoaTelefone;
        this.Cliente = Cliente;
        this.Colaborador = Colaborador;
        this.Fornecedor = Fornecedor;
        this.Tipopj = Tipopj;
        this.Datanascimento = Datanascimento;
        this.Pai = Pai;
        this.Mae = Mae;
        this.Sexo = Sexo;
        this.Rg = Rg;
        this.Emissor = Emissor;
        this.Ufemissor = Ufemissor;
        this.Datarg = Datarg;
        this.Cpf = Cpf;
        this.Ctps = Ctps;
        this.Datactps = Datactps;
        this.Nrpis = Nrpis;
        this.Datapis = Datapis;
        this.Regprofnumero = Regprofnumero;
        this.Conselho = Conselho;
        this.Ufconselho = Ufconselho;
        this.Regprofserie = Regprofserie;
        this.Profissao = Profissao;
        this.Dependentes = Dependentes;
        this.Razaosocial = Razaosocial;
        this.Cnpj = Cnpj;
        this.Inscricaoestadual = Inscricaoestadual;
        this.Inscricaomunicipal = Inscricaomunicipal;
        this.Objetosocial = Objetosocial;
        this.Observacoes = Observacoes;
    }
}