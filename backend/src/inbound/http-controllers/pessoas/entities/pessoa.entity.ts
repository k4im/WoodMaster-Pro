import { UUID, randomUUID } from "crypto";
import { Email } from "./ValueObjects/email.value.object";
import { Endereco } from "./ValueObjects/endereco.value.object";
import { Telefone } from "./ValueObjects/telefone.value.object";
import { CriarPessoaDto } from "../dto/criar-pessoa.dto";
import { IPessoa } from "src/interfaces/IPessoa.interface";


export class PessoaEntity {
    Uuid: string = randomUUID();
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
  
    constructor(
        Nome?: string,
        Matricula?: string | null,
        Codigo?: number | null,
        Datainclusao?: Date,
        Inativo?: boolean,
        Estrangeiro?: boolean,
        Email?: Email,
        PessoaEndereco?: Endereco[],
        PessoaTelefone?: Telefone[],
        Cliente?: boolean,
        Colaborador?: boolean,
        Fornecedor?: boolean,
        Tipopj?: boolean,
        Datanascimento?: Date,
        Pai?: string | null,
        Mae?: string | null,
        Sexo?: string | null,
        Rg?: string | null,
        Emissor?: string | null,
        Ufemissor?: string | null,
        Datarg?: Date | null,
        Cpf?: string,
        Ctps?: string | null,
        Datactps?: Date | null,
        Nrpis?: string | null,
        Datapis?: Date | null,
        Regprofnumero?: string | null,
        Conselho?: string | null,
        Ufconselho?: string | null,
        Regprofserie?: string | null,
        Profissao?: string | null,
        Dependentes?: number | null,
        Razaosocial?: string | null,
        Cnpj?: string | null,
        Inscricaoestadual?: string | null,
        Inscricaomunicipal?: string | null,
        Objetosocial?: string | null,
        Observacoes?: string | null
    ) {
        this.Nome = Nome;
        this.Matricula = Matricula;
        this.Codigo = Codigo;
        this.Datainclusao = Datainclusao;
        this.Inativo = Inativo;
        this.Estrangeiro = Estrangeiro;
        this.Email = Email;
        this.PessoaEndereco = PessoaEndereco;
        this.PessoaTelefones = PessoaTelefone;
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
    /**
     * O metodo poderá ser utilizado para criação de testes desta entidade
     * facilitando desta maneira a criação desta entidade sem a necessidade de
     * fornecer todos os campos presentes na mesma.
     * @returns Retorna uma pessoa com o padrão default.
     */
    default() { 
        let pessoa: IPessoa = {
            Uuid: randomUUID(),
            Nome: "Jonas",
            Email: new Email("jonas@email.com.br"),
            PessoaEndereco: [new Endereco().default()],
            PessoaTelefones: [new Telefone().default()],
            Cliente: false,
            Cnpj: "",
            Codigo: 123,
            Colaborador: false,
            Conselho: "",
            Cpf: "",
            Ctps: "",
            Datactps: new Date(),
            Datainclusao: new Date(),
            Datanascimento: new Date(),
            Datapis: new Date(),
            Datarg: new Date(),
            Dependentes: 0,
            Emissor: "",
            Estrangeiro: false,
            Fornecedor: true,
            Inativo: false,
            Inscricaoestadual: "",
            Inscricaomunicipal: "",
            Mae: "",
            Matricula: "",
            Nrpis: "",
            Objetosocial: "",
            Observacoes: "",
            Pai: "",
            Profissao: "",
            Razaosocial: "",
            Regprofnumero: "",
            Regprofserie: "",
            Rg: "",
            Sexo: "",
            Tipopj: false,
            Ufconselho: "",
            Ufemissor: ""
        }
        return pessoa;
    }

    criarPessoaPorDto(data: CriarPessoaDto) {
        return new PessoaEntity(
            data.Nome, 
            null, 
            data.Codigo, 
            new Date(),
            data.Inativo,
            null,
            data.Email,
            data.PessoaEndereco,
            data.PessoaTelefone,
            data.Cliente,
            data.Colaborador,
            data.Fornecedor,
        );

    }
}