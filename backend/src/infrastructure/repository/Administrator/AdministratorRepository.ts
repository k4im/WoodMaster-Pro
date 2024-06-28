import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IAdministratorRepository } from "../abstraction/IAdministratorRepository.interface";
import Administrator  from "src/domain/entities/admin.domain.entity";
import * as adm from 'src/infrastructure/database/models/Administrator.entity';
import { DatabaseGateway } from "src/application/ports/out-ports/database.gateway";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import ExpectedHttpError from "src/domain/types/expectedhttp.error";
import { IResponse } from "src/application/dto/interfaces/IResponse.interface";
import { IAdmin } from "src/application/dto/interfaces/IAdm.dto";

@Injectable()
export default class AdministratorRepository implements IAdministratorRepository {
    constructor(
        @Inject("DatabaseGateway")
        private readonly database: DatabaseGateway,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ) {}

    /**
     * Metodo de paginação.
     * 
     * Metodo utilizado para realizar a paginação dentro da
     * tabela de administradores dentro do banco.
     * @param page pagina para navegação
     * @param limit limite de resultados por pagina
     * @returns IResponse
     */
    async getAdministrators(page: number, limit: number): Promise<IResponse<IAdmin>> {
        try {
            const pages = (page -1) * limit;
            const db = await this.database.getDataSource();
            const repo = db.getRepository(adm.Administrator)
            const result = await repo.findAndCount({
                select: {Id: true, Uuid: true, EmailAddr: true, IsActive: true},
                take: pages, skip: limit});
            if(result[0].length <= 0){
                await this.database.closeConnection(db);
                throw new ExpectedHttpError('Administrators not founded.', 
                HttpStatus.NOT_FOUND)
            }
            await this.database.closeConnection(db);
            return {
                pagina_atual: page,
                total_itens: result[1],
                total_paginas: Math.ceil(result[1] / limit),
                resultados: result[0].map(admin => {
                    const adminReturn: IAdmin = {Uuid:admin.Uuid, Email: admin.EmailAddr, 
                        IsActive: admin.IsActive}
                    return adminReturn;})
            }
        } catch (error) {
            this.logger.error(`Houve um erro no repositorio de adm: ${error}`);
        }
    }

    /**
     * Metodo de busca por uuid.
     * 
     * Metodo utilizado para localizar um admin
     * através de seu uuid de identificação.
     * 
     * @param uuid uuid de identificação do administrador.
     * @returns IAdmin
     */
    async getAdministrator(uuid: string): Promise<IAdmin> {
        try {
            const db = await this.database.getDataSource();
            const repo = db.getRepository(adm.Administrator);
            const result = await repo.findOneBy({Uuid: uuid.toString()});
            if(!result) {
                await this.database.closeConnection(db);
                throw new ExpectedHttpError('Administrator not founded.', 
                HttpStatus.NOT_FOUND);
            } 
            await this.database.closeConnection(db);
            return {Uuid: result.Uuid, Email: result.EmailAddr, 
                    IsActive: result.IsActive}
        } catch (error) {
            this.logger.error(`Houve um erro ao realizar
                ao buscar admin por uuid: ${error}`);    
        }
    }

    /**
     * Metodo para localização baseando-se no Email.
     * 
     * Metodo utilizado para efetuar a busca
     * de um administrador baseando-se no endereço
     * de email do mesmo.
     * @param email Email do administrador;
     * @returns IAdmin
     */
    async getAdministratorByEmail(email: string): Promise<IAdmin> {
        try {
            const db = await this.database.getDataSource();
            const repo = db.getRepository(adm.Administrator);
            const administrator = await repo.findOneBy({EmailAddr: email.toString()});
            if(!administrator){
                await this.database.closeConnection(db);
                throw new ExpectedHttpError('Administrator not founded.', 
                HttpStatus.NOT_FOUND)
            }
            await this.database.closeConnection(db);
            return {Uuid: administrator.Uuid, Email: administrator.EmailAddr, IsActive: administrator.IsActive,
                Password: administrator.HashPassword
            }
        } catch (error) {
            this.logger.error(`Houve um erro ao buscar admin por email: ${error}`)
        }
    }

    /**
     * Metodo de criação de administrador.
     * 
     * Metodo utilizado para realizar
     * um novo administrador dentro do sistema.
     * @param admin dados de administrador.
     * @returns boolean
     */
    async createAdministrator(admin: Administrator): Promise<boolean> {
        try {
            const db = await this.database.getDataSource();
            db.manager.transaction(async (transaction) => {
                const repo = transaction.getRepository(adm.Administrator);
                const adminCreated = repo.create({
                    EmailAddr: admin.Email.email,
                    HashPassword: admin.Password.value,
                    IsActive: true});
                transaction.save(adminCreated);
            })
            await this.database.closeConnection(db);
            return true;
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar criar o administrador: ${error}`);
        }
    }

    /**
     * Metodo para desativar um administrador do banco de dados.
     * 
     * Metodo poderá desabilitar um administrador do banco de dados
     * fazendo com que o mesmo não possa mais efetuar o login no sistema.
     * 
     * @param uuid uuid de identificação
     * @returns boolean
     */
    async deactivateAdministrator(uuid: string): Promise<boolean> {
        try {
            const db = await this.database.getDataSource();
            db.manager.transaction(async (transcation) => {
                await transcation.getRepository(adm.Administrator)
                .update({Uuid: uuid.toString()}, {IsActive: false});
            });
            await this.database.closeConnection(db);
            return true; 
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar
            realizar a desativação do administrador: ${error}`);
            return false;
        }
    } 

}