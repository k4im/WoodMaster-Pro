import { Inject, Injectable } from '@nestjs/common';
import { Usuario } from 'src/inbound/http-controllers/usuarios/entities/usuario.entity';
import { UpdateUsuarioDto } from 'src/inbound/http-controllers/usuarios/dto/update-usuario.dto';
import { IResponse } from 'src/core/interfaces/IResponse.interface';
import { Repository } from 'src/outbound/ports/Repository.gateway';
import { DatabaseService } from '../../database/database.service';
import { LoggerGateway } from 'src/outbound/ports/logger.gateway';

@Injectable()
export class UsuarioRepositoryService implements Repository {
    


    constructor(private readonly databaseService: DatabaseService,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway) {}
        
    /**
     * Realiza a operação de paginação no banco de dados na tabela de pessoa.
     * @param pagina recebe a pagina que sera acessada
     * @param limit recebe o limite de resultados por pagina.
     * @returns IResponse
     */
    async paginarResultados(pagina: number, limit: number) { 
        try {
            let calculoPagina = (pagina - 1) * limit; 
            
            let resultado = await this.databaseService.usuario.findMany({
                skip: calculoPagina,
                take: limit
            });

            let totalDeRegistos: number = await this.databaseService.pessoa.count();
            let totalDePaginas: number = Math.ceil(totalDeRegistos / limit);
            
            let resposta: IResponse = {
                pagina_atual: pagina,
                total_itens: totalDeRegistos,
                total_paginas: totalDePaginas,
                resultados: resultado
            };
            this.logger.log(`Efetuado operação de paginação de usuarios [Usuario Repository] - [Metodo] - [paginar.]: pagina=${pagina}, limit=${limit}`);
            await this.databaseService.$disconnect();
            return resposta;
        } catch (error) {
            await this.databaseService.$disconnect();
            this.logger.error(`Não foi possivel realizar a paginação [Usuario Repository] - [Metodo] - [paginar]: [${error}]`);
        }
    }

    /**
     * O metodo será utilizado para inserção de novos usuarios ao banco de dados.
     * 
     * @param usuario recebe um usuario que será utilizado para criação no banco de dados.
     * @returns true | false
     */
    async criarNovoRegistro(usuario: Usuario): Promise<boolean> {
        try {
            // Checa se existe um usuario criado para a pessoa.
            let checkUser = await this.databaseService.usuario.findUnique({
                where: {
                    PessoaId: usuario.PessoaId,
                    Email: usuario.Email.email,
                    TenantId: usuario.TenantId
                }
            });

            // Caso um usuario já exista para uma pessoa será retornado nulo,
            // pois uma pessoa só poderá possuir um login.
            if(checkUser) {
                this.logger.log(`Usuario já existente para esta pessoa. [Usuario Repository] - [Metodo] - [criar novo registro.]`)
                return false
            };
            
            let result = await this.databaseService.usuario.create({
                data: {
                    PessoaId: usuario.PessoaId,
                    Email: usuario.Email.email,
                    Inativo: false,
                    Senha: usuario.Senha,
                    RoleId: usuario.Role,
                    TenantId: ''
                }
            })
            this.logger.log(`Efetuado criação de usuario [Usuario Repository] - [Metodo] - [criar novo registro.]`)
            await this.databaseService.$disconnect();
            return true;
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar criar usuario [Usuario Repository] - [Metodo] - [criar novo registro.]: ${error}`)
            await this.databaseService.$disconnect();
            return false;
        }
    }

    /**
     * O metodo será utilizado para buscar um usuario a partir de um uuid especifico.
     * @param uuid Recebe o uuid do cliente que será utilizado para busca
     * @returns Usuario
     */
    async buscarPorUUID(uuid: string): Promise<any> {
        try {
            let result = await this.databaseService.usuario.findFirst({
                where: {
                    Uuid: uuid
                }
            })
            if (result === null) {
                await this.databaseService.$disconnect();
                return null
            }
            this.logger.log(`Efetuado busca de usuario por UUID [Usuario Repository] - [Metodo] - [criar novo registro.]: UUID:${uuid}`)
            await this.databaseService.$disconnect();
            return result;
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar buscar usuario [Usuario Repository] - [Metodo] - [criar novo registro.]: ${error}`)
            await this.databaseService.$disconnect();
        }
    }


    /**
     * O metodo sera utilizado para atualização de um novo usuario.
     * 
     * @param registro Recebe um registro de atualização
     * @param uuid Recebe o uuid do usuario que sera atualziado
     * @returns true | false 
     */
    async atualizarRegistro(usuario: UpdateUsuarioDto, uuid: string): Promise<any> {
        try {
            let result = await this.databaseService.usuario.update({
                where: {Uuid: uuid},
                data: {
                    Email: usuario.Email.email,
                    Senha: usuario.Senha,
                    Inativo: usuario.Inativo,
                }
            })
            this.logger.log("Usuario atualizado com sucesso! [Usuario Repository] - [Metodo] - [Atualizar Registro]")
            await this.databaseService.$disconnect();
            return result;
        } catch (error) {
            await this.databaseService.$disconnect();
            this.logger.error(`Não foi possivel atualizar usuario [Usuario Repository] - [Metodo] - [Atualizar Registro]: [${error}]`);
            return false;
        }    
    }

    /**
     * Recebe o UUID para desativar o usuario.
     * @param uuid Recebe o uuid para desativação de usuario
     * @returns true | false
     */
    async deletarRegistro(uuid: string): Promise<boolean> {
        try {
            await this.databaseService.usuario.update({
                where: {Uuid: uuid},
                data: {Inativo: true}
            });
            this.databaseService.$disconnect();
            this.logger.log(`Usuario desativado com sucesso! [Usuario Repository] - [Metodo] - [Deletar Registro] UUID: [${uuid}]`)
            return true;
        } catch (error) {
            await this.databaseService.$disconnect();
            this.logger.error(`Não foi possivel desativar usuario com base no UUID [Usuario Repository] - [Metodo] - [Deletar registro]: [${error}]`);
            return false;
        }      
    }
    
}
