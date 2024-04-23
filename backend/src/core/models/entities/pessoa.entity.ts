import { randomUUID } from "crypto";
import { Email } from "../valueObjects/email.value.object";
import { Endereco } from "../valueObjects/endereco.value.object";
import { Telefone } from "../valueObjects/telefone.value.object";
import { CriarPessoaDto } from "../../../inbound/http-controllers/pessoas/dto/criar-pessoa.dto";
import { IPessoa } from "src/core/interfaces/IPessoa.interface";


export class PessoaEntity {
    Nome: string;
    Matricula: string | null;
    Codigo: number | null;
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
    TenantId:   string
    constructor(
        Nome?: string,
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
        this.Matricula = this.gerarMatricula();
        this.Codigo = this.gerarCodigo();
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

    /**
     * O metodo poderá estar sendo utilizado para a criação de uma nova entidade
     * partindo dos dados presentes em um DTO.
     * @param data Recebe um dto para criação de um novo registro
     * @returns 
     */
    criarPessoaPorDto(data: CriarPessoaDto) {
        return new PessoaEntity(
            data.Nome,
            data.Inativo,
            data.Estrangeiro,
            data.Email,
            data.PessoaEndereco,
            data.PessoaTelefones,
            data.Cliente,
            data.Colaborador,
            data.Fornecedor,
            data.Tipopj,
            data.Datanascimento,
            data.Pai,
            data.Mae,
            data.Sexo,
            data.Rg,
            data.Emissor,
            data.Ufemissor,
            data.Datarg,
            data.Cpf,
            data.Ctps,
            data.Datactps,
            data.Nrpis,
            data.Datapis,
            data.Regprofnumero,
            data.Conselho,
            data.Ufconselho,
            data.Regprofserie,
            data.Profissao,
            data.Dependentes,
            data.Razaosocial,
            data.Cnpj,
            data.Inscricaoestadual,
            data.Inscricaomunicipal,
            data.Objetosocial,
            data.Observacoes,
            data.TenantId
        );

    }

    /**
     * O metodo podera ser utilizado para a emissão de uma nova matricula
     * portanto neste cenário estara gerando matriculas de forma automática para cada pessoa.
     * @returns retorna uma matricula nova para a pessoa.
     */
    gerarMatricula(): string { 
        const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let matricula = '';

        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * caracteres.length);
            matricula += caracteres.charAt(randomIndex);
          }
      
        return matricula
    }

    /**
     * O metodo podera ser utilizado para a emissão de um novo codigo
     * portanto neste cenário estara gerando codigos de forma automática para cada pessoa.
     * @returns retorna um codigo da pessoa.
     */
    gerarCodigo(): number { 
        const min = 100000; // Menor número com 6 dígitos
        const max = 999999; // Maior número com 6 dígitos
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}