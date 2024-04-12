import { Email } from "./ValueObjects/email.value.object";
import { Endereco } from "./ValueObjects/endereco.value.object";
import { Telefone } from "./ValueObjects/telefone.value.object";


export class Pessoa {
    Handle: number;
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
  
    constructor(pessoa: Pessoa) {
        this.Nome = pessoa.Nome;
        this.Matricula = pessoa.Matricula || null;
        this.Codigo = pessoa.Codigo || null;
        this.Datainclusao = pessoa.Datainclusao;
        this.Inativo = pessoa.Inativo;
        this.Estrangeiro = pessoa.Estrangeiro;
        this.Email = pessoa.Email;
        this.PessoaEndereco = pessoa.PessoaEndereco;
        this.PessoaTelefone = pessoa.PessoaTelefone;
        this.Cliente = pessoa.Cliente;
        this.Colaborador = pessoa.Colaborador;
        this.Fornecedor = pessoa.Fornecedor;
        this.Tipopj = pessoa.Tipopj;
        this.Datanascimento = pessoa.Datanascimento;
        this.Pai = pessoa.Pai || null;
        this.Mae = pessoa.Mae || null;
        this.Sexo = pessoa.Sexo || null;
        this.Rg = pessoa.Rg || null;
        this.Emissor = pessoa.Emissor || null;
        this.Ufemissor = pessoa.Ufemissor || null;
        this.Datarg = pessoa.Datarg || null;
        this.Cpf = pessoa.Cpf;
        this.Ctps = pessoa.Ctps || null;
        this.Datactps = pessoa.Datactps || null;
        this.Nrpis = pessoa.Nrpis || null;
        this.Datapis = pessoa.Datapis || null;
        this.Regprofnumero = pessoa.Regprofnumero || null;
        this.Conselho = pessoa.Conselho || null;
        this.Ufconselho = pessoa.Ufconselho || null;
        this.Regprofserie = pessoa.Regprofserie || null;
        this.Profissao = pessoa.Profissao || null;
        this.Dependentes = pessoa.Dependentes || null;
        this.Razaosocial = pessoa.Razaosocial || null;
        this.Cnpj = pessoa.Cnpj || null;
        this.Inscricaoestadual = pessoa.Inscricaoestadual || null;
        this.Inscricaomunicipal = pessoa.Inscricaomunicipal || null;
        this.Objetosocial = pessoa.Objetosocial || null;
        this.Observacoes = pessoa.Observacoes || null;
    }  }