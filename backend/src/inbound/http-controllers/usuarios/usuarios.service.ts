import { Injectable } from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CriarUsuarioDto } from './dto/create-usuario.dto';
import { Repository } from 'src/outbound/repository/Repository';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  
  
  constructor(
    private readonly repo: Repository, 
    private readonly logger: CustomLogger) {}
  
  /**
   * Abstração de criação de um novo usuario. 
   * @param createUsuarioDto Recebe o data para criar um novo usuario.
   * @returns true | false
   */
  async create(createUsuarioDto: CriarUsuarioDto) {
    this.logger.log("Processando requisição.. [Usuario Service] - [Metodo] - [Create]")
    try {
        this.logger.log("Criando usuario a partir do DTO. [Usuario Service] - [Metodo] - [Create]")
        let usuario = new Usuario(createUsuarioDto.PessoaId, createUsuarioDto.Email, createUsuarioDto.Senha)
        let result = await this.repo.criarNovoRegistro(usuario);
        return result;
    } catch (error) {
        this.logger.error("Houve um erro ao tentar criar usuario. [Usuario Service] - [Metodo] - [Create]")
        return false;
    }
  }

  /**
   * Absteração de paginação
   * @param pagina pagina para navegação entre os resultados.
   * @param limit limite de resultado por paginas.
   * @returns 
   */
  async findAll(pagina: number, limit: number) {
    this.logger.log("Processando requisição.. [Usuario Service] - [Metodo] - [find all]")
    try {
       let result = await this.repo.paginarResultados(pagina, limit);
        this.logger.log("Efetuando busca paginada de usuarios [Usuario Service] - [Metodo] - [find all]") 
       return result;
    } catch (error) {
        this.logger.error("Houve um erro ao tentar buscar usuarios paginados.  [Usuario Service] - [Metodo] - [find all]")
    }
  }

  /**
   * Abstração de busca de usuario.
   * @param uuid Recebe o UUID do usuario para efetuar a busca
   * @returns Usuario
   */
  async findOne(uuid: string) {
    this.logger.log("Processando requisição.. [Usuario Service] - [Metodo] - [find one]")
    try {
       let result = await this.repo.buscarPorUUID(uuid);
        this.logger.log("Efetuando busca de usuario [Usuario Service] - [Metodo] - [find one]") 
       return result;
    } catch (error) {
        this.logger.error("Houve um erro ao tentar buscar o usuario.  [Usuario Service] - [Metodo] - [find one]")
    }  }
    
  /**
   * Abtração de update.
   * @param uuid Recebe o UUID para atualizar
   * @param updateUsuarioDto Recebe os dados que serão atualizados
   * @returns true | false
   */
  async update(uuid: string, updateUsuarioDto: UpdateUsuarioDto) {
    this.logger.log("Processando requisição.. [Usuario Service] - [Metodo] - [update]")
    try {
       let result = await this.repo.atualizarRegistro(updateUsuarioDto, uuid);
        this.logger.log("Efetuando atualização de usuario [Usuario Service] - [Metodo] - [update]") 
       return result;
    } catch (error) {
        this.logger.error("Houve um erro ao tentar atualizar  o usuario.  [Usuario Service] - [Metodo] - [update]")
    }
  }

  async remove(uuid: string) {
    this.logger.log("Processando requisição.. [Usuario Service] - [Metodo] - [delete]")
    try {
       let result = await this.repo.deletarRegistro(uuid);
        this.logger.log("Efetuando desativação de usuario [Usuario Service] - [Metodo] - [delete]") 
       return result;
    } catch (error) {
        this.logger.error("Houve um erro ao tentar desativar o usuario.  [Usuario Service] - [Metodo] - [delete]")
    }  }
}
