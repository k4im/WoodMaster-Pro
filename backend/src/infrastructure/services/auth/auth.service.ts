import { Inject, Injectable } from "@nestjs/common";
import { DatabaseGateway } from "src/application/ports/out-ports/database.gateway";
import IJwtService from "../jwt/IJwtService";
import AuthAbstraction from "./abstrations/AuthAbstrancion";
import * as bcrypt from 'bcrypt';
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { User } from "src/domain/databaseEntities/User.entity";
import IExtractor from "../extractor/abstraction/IExtractor.interface";
import IUserExtractor from "../extractor/abstraction/IUserExtractor.interface";


@Injectable()
export default class AuthService implements AuthAbstraction {

    constructor(
        @Inject("DatabaseGateway") private readonly database: DatabaseGateway,
        @Inject("IJwtService") private readonly jwt: IJwtService,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway,
        @Inject("IExtractor") private readonly extractor: IExtractor<User, IUserExtractor>) { }

    async checkPassword(pwd: string, hash: string): Promise<boolean> {
        this.logger.log(`Comparando senha com hash.... [AuthService]`)
        return bcrypt.compare(pwd, hash)
    }

    async login(email: string, pwd: string): Promise<string> {
        try {
            const db = await this.database.getDataSource();
            this.logger.log(`Buscando usuario.... [AuthService]: ${email}`)
            const user = await db.getRepository(User).findOne({ 
                relations: ['Role', 'Role.Permissions'],
                where: {EmailAddr: email}
             });
            if(user) throw new Error("Usuario não encontrado.")
            if(await this.checkPassword(pwd, user.HashPassword)) {
                const dataFromUser = await this.extractor.process(user);
                return this.jwt.encodeJwt(dataFromUser);
            };
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar logar o usuario [AuthService]: ${error}`)
        }
    }
}