import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Repository } from 'src/outbound/repository/Repository';
import { CustomLogger } from 'src/helpers/logger/logger.service';

@Injectable()
export class TenantService {

  constructor(
    private readonly repo: Repository,
    private readonly logger: CustomLogger) {}

  /**
   * Abstração de processo de criação de um tenant
   * @param createTenantDto Recebe os dados para a criação de um novo tenant 
   * @returns true | false
   */
  async create(createTenantDto: CreateTenantDto) {
    this.logger.log(`Processando operação.... [Tenant Service] - [Metodo] - [create]`)
    try {
      let result = await this.repo.criarNovoRegistro(createTenantDto);
      this.logger.log(`Efetuado criação de tenant [Tenant Service] - [Metodo] - [create]`)
      return result
    } catch (error) {
      this.logger.error(`Não foi possivel processar a operação [Tenant Service] - [Metodo] - [create]: ${error}`)
    }
  }

  /**
   * Abstração de paginação de resultados.
   * @param pagina Recebe a pagina para navegação.
   * @param limit Recebe o limite de resultados que serão apresentados por pagina.
   * @returns IResponse
   */
  async findAll(pagina: number, limit: number) {
    this.logger.log(`Processando operação.... [Tenant Service] - [Metodo] - [find all]`)
    try {
      (pagina === undefined) ? pagina = 1:  pagina;
      (limit === undefined) ? limit = 5:  limit;
      let result = await this.repo.paginarResultados(parseInt(`${pagina}`), parseInt(`${limit}`));
      this.logger.log(`Efetuado busca paginada [Tenant Service] - [Metodo] - [find all]`)
      return result;
    } catch (error) {
      this.logger.error(`Não foi possivel processar a operação [Tenant Service] - [Metodo] - [find all]: ${error}`)
    }
  }

  /**
   * Abstração de busca por um tenant baseando-se no UUID. 
   * @param uuid Recebe o UUID do tenant para efetuar a busca.
   * @returns Tenant
   */
  async findOne(uuid: string) {
    this.logger.log(`Processando operação.... [Tenant Service] - [Metodo] - [find one]`)
    try {
      let result = await this.repo.buscarPorUUID(uuid);
      this.logger.log(`Efetuado busca [Tenant Service] - [Metodo] - [find one]`)
      return result;
    } catch (error) {
      this.logger.error(`Não foi possivel processar a operação [Tenant Service] - [Metodo] - [find one]: ${error}`)
    }  
  }
    
  /**
   * Abtração de update do tenant.
   * @param uuid Recebe o UUID do tenant para efetuar a operação de update.
   * @param updateTenantDto Recebe os dados para atualização.
   * @returns true | false
   */
  async update(uuid: string, updateTenantDto: UpdateTenantDto) {
    this.logger.log(`Processando operação.... [Tenant Service] - [Metodo] - [update]`)
    try {
      let result = await this.repo.atualizarRegistro(updateTenantDto, uuid);
      this.logger.log(`Efetuado atualização [Tenant Service] - [Metodo] - [update]`)
      return result;
    } catch (error) {
      this.logger.error(`Não foi possivel processar a operação [Tenant Service] - [Metodo] - [update]: ${error}`)
    }  
  }


  /**
   * Abstração para remoção do tenant do banco de dados.
   * @param uuid Recebe o UUID do tenant para efetuar a remoção do mesmo.
   * @returns true | false
   */
  async remove(uuid: string) {
    this.logger.log(`Processando operação.... [Tenant Service] - [Metodo] - [update]`)
    try {
      let result = await this.repo.deletarRegistro(uuid);
      this.logger.log(`Efetuado atualização [Tenant Service] - [Metodo] - [update]`)
      return result;
    } catch (error) {
      this.logger.error(`Não foi possivel processar a operação [Tenant Service] - [Metodo] - [update]: ${error}`)
    }   }
}
