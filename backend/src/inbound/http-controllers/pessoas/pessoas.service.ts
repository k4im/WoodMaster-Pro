import { Injectable } from '@nestjs/common';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Repository } from 'src/outbound/repository/Repository';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { CriarPessoaDto } from './dto/criar-pessoa.dto';
import { PessoaEntity } from './entities/pessoa.entity';

@Injectable()
export class PessoasService {
  
  constructor(
    private readonly Repository: Repository,
    private readonly Logger: CustomLogger) {}
  
  async create(createPessoaDto: CriarPessoaDto) {
    this.Logger.log("Processando requisição no serviço de pessoas [PessoasService] - [Metodo] - [create]");
    try {
      this.Logger.log(`Criando entidade de pessoa a partir do DTO informado [PessoasService] - [Metodo] - [create].`)
      
      let pessoaEntity = new PessoaEntity().criarPessoaPorDto(createPessoaDto);
      
      this.Logger.log(`Tentando efetuar a criação de uma nova pessoa [PessoasService] - [Metodo] - [create].`)
      
      let result = await this.Repository.criarNovoRegistro(pessoaEntity);
        
    } catch (error) {
      
      this.Logger.error(`Error ao tentar criar uma nova pessoa: [PessoasService] - [Metodo] - [create]`)      
    }
  }

  findAll(pagina: number, limit: number) {
    this.Logger.log("Processando requisição no serviço de pessoas: [PessoasService] - [Metodo] - [FindAll]");
    return `This action returns all pessoas`;
  }

  findOne(id: number) {
    this.Logger.log("Processando requisição no serviço de pessoas: [PessoasService] - [Metodo] - [FindOne]");
    return `This action returns a #${id} pessoa`;
  }

  update(id: number, updatePessoaDto: UpdatePessoaDto) {
    this.Logger.log("Processando requisição no serviço de pessoas: [PessoasService] - [Metodo] - [Update]");
    return `This action updates a #${id} pessoa`;
  }

  remove(id: number) {
    this.Logger.log("Processando requisição no serviço de pessoas: [PessoasService] - [Metodo] - [Remove]");
    return `This action removes a #${id} pessoa`;
  }
}
