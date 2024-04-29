import { Inject, Injectable } from '@nestjs/common';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Repository } from 'src/outbound/repository/Repository';
import { CriarPessoaDto } from './dto/criar-pessoa.dto';
import { PessoaEntity } from '../../../core/models/entities/pessoa.entity';
import { Pessoa } from '@prisma/client';
import { LoggerGateway } from 'src/outbound/logger/logger.gateway';
import { IResponse } from 'src/core/interfaces/IResponse.interface';
import { PessoaExceptionValidate } from 'src/core/helpers/exception.helper';

@Injectable()
export class PessoasService {
  
  constructor(
    private readonly Repository: Repository,
    @Inject("LoggerGateway")
    private readonly Logger: LoggerGateway) {}
  
  /**
   * Abstração de processo de criação de um novo registro.
   * 
   * @param createPessoaDto Deverá ser encaminhado uma pessoa com o padrão presente no DTO
   * para que então seja possivel efetuar a criação de um novo registro no DB.
   * @returns 
   */
  async create(createPessoaDto: CriarPessoaDto) {
    this.Logger.log("Processando requisição no serviço de pessoas [PessoasService] - [Metodo] - [create]");
    try {
        this.Logger.log(`Criando entidade de pessoa a partir do DTO informado [PessoasService] - [Metodo] - [create].`)
        let pessoaEntity = new PessoaEntity().criarPessoaPorDto(createPessoaDto);

        this.Logger.log(`Tentando efetuar a criação de uma nova pessoa [PessoasService] - [Metodo] - [create].`)
        let result = await this.Repository.criarNovoRegistro(pessoaEntity);
        return result
    } catch (error) {
       this.Logger.error(`Error ao tentar criar uma nova pessoa: [PessoasService] - [Metodo] - [create]: ${error}`);
       PessoaExceptionValidate(error);
       return false;
    }
  }
  
  /**
   * Abstração de processo de paginação.
   * 
   * @param pagina Recebe a pagina  que sera apresentado na paginação.
   * @param limit Recebe o limite de dados que serão apresentados na paginação.
   * @returns IReponse
   */
  async findAll(pagina: number, limit: number) : Promise<IResponse> {
    this.Logger.log("Processando requisição no serviço de pessoas: [PessoasService] - [Metodo] - [FindAll]");
    try {
        let page = (pagina === undefined) ? 1: pagina;
        let validatedLimit = (limit === undefined) ? 5:  limit;
        let result = await this.Repository.paginarResultados(page, validatedLimit);
        return result;
    } catch (error) {
      this.Logger.error(`Error ao tentar criar uma nova pessoa: [PessoasService] - [Metodo] - [findAll]: ${error}`)
      throw new Error("Houve um erro ao realizar a operação de paginação.")     
    }
  }

  /**
   * Abstração para buscar um registro beaseando-se no UUID.
   *  
   * @param uuid Recebe o UUId do registro para efetuar a busca
   * @returns Pessoa
   */
  async findOne(uuid: string): Promise<Pessoa> {
    this.Logger.log("Processando requisição no serviço de pessoas: [PessoasService] - [Metodo] - [FindOne]");
    try {
        this.Logger.log("Efetuando busca de registro: [PessoasService] - [Metodo] - [FindOne]");
        let result = await this.Repository.buscarPorUUID(uuid);
        return result;
    } catch (error) {
        this.Logger.error(`Não foi possivel coletar o registro com o UUID: [PessoasService] - [Metodo] - [FindOne]: ${error}`);
    }
  }
  /**
   * Abstração de atualização de registro.
   * 
   * @param uuid Recebe o UUID da pessoa.
   * @param updatePessoaDto Recebe os novos registro que serão atualizados.
   * @returns true | false
   */
  async update(uuid: string, updatePessoaDto: UpdatePessoaDto) {
    this.Logger.log("Processando requisição no serviço de pessoas: [PessoasService] - [Metodo] - [Update]");
    try {
      this.Logger.log("Efetuando atualização de registro: [PessoasService] - [Metodo] - [Update]")
      let result = await this.Repository.atualizarRegistro(updatePessoaDto, uuid);
      return result
    } catch (error) {
      this.Logger.error(`Não foi possivel atualizar o registro: [PessoasService] - [Metodo] - [Update]: ${error}`)
      
    }

  }
  
  /**
   * Abstração para remoção de um registro.
   * 
   * @param uuid Recebe o UUID do registro.
   * @returns true | false
   */
  async remove(uuid: string) {
    this.Logger.log("Processando requisição no serviço de pessoas: [PessoasService] - [Metodo] - [Remove]");
    try {
      this.Logger.log("Efetuando remoção de registro: [PessoasService] - [Metodo] - [Remove]"); 
      let result = await this.Repository.deletarRegistro(uuid);
      return result;
    } catch (error) {
      this.Logger.log("Não foi possivel remover o registro: [PessoasService] - [Metodo] - [Remove]");
    }
  }
}
