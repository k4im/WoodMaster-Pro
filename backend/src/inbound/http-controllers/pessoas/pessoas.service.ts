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
  
  create(createPessoaDto: CriarPessoaDto) {
    let pessoaEntity = new PessoaEntity().criarPessoaPorDto(createPessoaDto);
    
    this.Logger.log("Processando requisição no serviço de pessoas: [Metodo] - [create]");
    return 'This action adds a new pessoa';
  }

  findAll(pagina: number, limit: number) {
    this.Logger.log("Processando requisição no serviço de pessoas: [Metodo] - [FindAll]");
    return `This action returns all pessoas`;
  }

  findOne(id: number) {
    this.Logger.log("Processando requisição no serviço de pessoas: [Metodo] - [FindOne]");
    return `This action returns a #${id} pessoa`;
  }

  update(id: number, updatePessoaDto: UpdatePessoaDto) {
    this.Logger.log("Processando requisição no serviço de pessoas: [Metodo] - [Update]");
    return `This action updates a #${id} pessoa`;
  }

  remove(id: number) {
    this.Logger.log("Processando requisição no serviço de pessoas: [Metodo] - [Remove]");
    return `This action removes a #${id} pessoa`;
  }
}
