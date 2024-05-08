import { Inject, Injectable } from "@nestjs/common";
import { Permissions } from "src/adapters/framework/database/entities/Permissions.entity";
import { Person } from "src/adapters/framework/database/entities/Person.entity";
import { Role } from "src/adapters/framework/database/entities/Role.entity";
import { User } from "src/adapters/framework/database/entities/User.entity";
import { DatabaseGateway } from "src/application/ports/out-ports/database.gateway";
import IDatabaseService from "src/application/ports/out-ports/databaseService.gateway";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { IUserDto } from "src/domain/dto/IUser.dto";
import RoleDomainEntity from "src/domain/entities/role.domain";
import UserDomanEntity from "src/domain/entities/user.domain";
import { IResponse } from "src/domain/interfaces/IResponse.interface";
import IUserRespository from "src/domain/interfaces/IUserRepository.interface";
import TransactionService from "src/infrastructure/services/transaction.service";
import ResultTransformerService from "src/infrastructure/services/transformResult.service";
import { DataSource, EntityManager } from "typeorm";

@Injectable()
export default class UserRepository implements IUserRespository {

    constructor(
        @Inject("IDatabaseService") private readonly database: IDatabaseService,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway){}
    findById(id: string): Promise<IUserDto> {
        throw new Error("Method not implemented.");
    }
    
    async find(page: number, limit: number, tenatnId: string): Promise<IResponse<IUserDto>> {
        try {
            this.logger.log("Abrindo conexão com banco de dados.... [UserRepository]");
            const queryExecuter = await this.database.paginateUsers(page, limit, tenatnId);
            const transformerService = new ResultTransformerService();
            return transformerService.transformResultsUser(queryExecuter, limit, page);
        } catch (error) {
            this.logger.error(`Houve um erro ao efetuar a paginação.... [UserRespository]: ${error}`);
        }
    }
    async save(data: UserDomanEntity): Promise<boolean> {
        try {
            this.logger.log(`gerando conexão com o banco... [UserRespository]`)
            const db = await this.database.openConnection();
            const transactionService = new TransactionService(db);
            const transaction = await transactionService.transactionCreateUser(data);
            this.database.closeConnection(db);
            if(transaction) {
                this.logger.log(`Usuario Criado com sucesso... [UserRespository]`)
                return true;
            };
            return false;
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar criar o usuario.... [UserRespository]: ${error}`);
            return false;
        }
    }
    update(data: UserDomanEntity, uuid: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deactive(uuid: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}