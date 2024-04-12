"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pessoa = void 0;
const crypto_1 = require("crypto");
class Pessoa {
    constructor(pessoa) {
        this.Uuid = (0, crypto_1.randomUUID)();
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
    }
}
exports.Pessoa = Pessoa;
//# sourceMappingURL=Pessoa.model.js.map