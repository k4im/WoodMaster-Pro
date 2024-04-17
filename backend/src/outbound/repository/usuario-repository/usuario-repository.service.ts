import { Injectable } from '@nestjs/common';
import { Repository } from '../Repository';
import { IResponse } from 'src/interfaces/IResponse.interface';
import { DatabaseService } from 'src/outbound/database/database.service';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { Usuario } from 'src/inbound/http-controllers/usuarios/entities/usuario.entity';
import { UpdateUsuarioDto } from 'src/inbound/http-controllers/usuarios/dto/update-usuario.dto';

@Injectable()
export class UsuarioRepositoryService implements Repository {
    


    constructor(private readonly databaseService: DatabaseService,
        private readonly logger: CustomLogger) {}
        
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
            this.logger.log(`Efetuado operação de paginação de pessoas: pagina=${pagina}, limit=${limit}`);
            await this.databaseService.$disconnect();
            return resposta;
        } catch (error) {
            await this.databaseService.$disconnect();
            this.logger.error(`Não foi possivel realizar a paginação: [${error}]`);
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
            let result = await this.databaseService.usuario.create({
                data: {
                    PessoaId: usuario.PessoaId,
                    Uuid: usuario.Uuid,
                    Email: usuario.Email.email,
                    Inativo: false,
                    Senha: usuario.Senha,
                }
            })
            this.logger.log(`Efetuado criação de usuario [Repository] - [Metodo] - [criar novo registro.]`)
            await this.databaseService.$disconnect();
            return true;
        } catch (error) {
            this.logger.log(`Houve um erro ao tentar criar usuario [Repository] - [Metodo] - [criar novo registro.]: ${error}`)
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
            this.logger.log(`Efetuado busca de usuario por UUID [Repository] - [Metodo] - [criar novo registro.]: UUID:${uuid}`)
            await this.databaseService.$disconnect();
            return result;
        } catch (error) {
            this.logger.log(`Houve um erro ao tentar buscar usuario [Repository] - [Metodo] - [criar novo registro.]: ${error}`)
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
            this.logger.log("Usuario atualizado com sucesso! [Repository] - [Metodo] - [Atualizar Registro]")
            await this.databaseService.$disconnect();
            return result;
        } catch (error) {
            await this.databaseService.$disconnect();
            this.logger.error(`Não foi possivel atualizar usuario [Repository] - [Metodo] - [Atualizar Registro]: [${error}]`);
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
            this.logger.log(`Usuario desativado com sucesso! [Repository] - [Metodo] - [Deletar Registro] UUID: [${uuid}]`)
            return true;
        } catch (error) {
            await this.databaseService.$disconnect();
            this.logger.error(`Não foi possivel desativar usuario com base no UUID [Repository] - [Metodo] - [Deletar registro]: [${error}]`);
            return false;
        }      
    }
    
}
