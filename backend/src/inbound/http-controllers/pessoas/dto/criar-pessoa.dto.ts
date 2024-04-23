import { randomUUID } from "crypto";
import { Email } from "../../../../core/models/valueObjects/email.value.object";
import { Endereco } from "../../../../core/models/valueObjects/endereco.value.object";
import { Telefone } from "../../../../core/models/valueObjects/telefone.value.object";
import { ApiProperty } from "@nestjs/swagger";

export class CriarPessoaDto {
    
    @ApiProperty()
    Nome: string;
    @ApiProperty()
    Matricula: string | null;
    @ApiProperty()
    Codigo: number | null;
    @ApiProperty()
    Inativo: boolean;
    @ApiProperty()
    Estrangeiro: boolean;
    
    @ApiProperty()
    Email: Email;
    @ApiProperty({type: Endereco, isArray: true})
    PessoaEndereco: Endereco[]

    @ApiProperty({type: Telefone, isArray: true})
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
    @ApiProperty()
    TenantId: string
    
    // Construturo atualmente encontra-se apenas com os campos minimos para serem criado
    // sendo necessário futuramente estar realizando refinamento deste DTO.
    constructor(
        Nome?: string,
        Matricula?: string | null,
        Codigo?: number | null,
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
        Observacoes?: string | null,
        tenant?: string
    ) {
        this.Nome = Nome;
        this.Matricula = Matricula;
        this.Codigo = Codigo;
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
        this.TenantId = tenant
    }
    
}
