import { Inject, Injectable } from "@nestjs/common";
import { DatabaseGateway } from "src/application/ports/out-ports/database.gateway";
import IJwtService from "../jwt/IJwtService";
import AuthAbstraction from "./abstrations/AuthAbstrancion";
import * as bcrypt from 'bcrypt';
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { User } from "src/domain/databaseEntities/User.entity";
import IExtractor from "../extractor/abstraction/IExtractor.interface";
import IUserExtractor from "../extractor/abstraction/IUserExtractor.interface";
import IUserRespository from "src/infrastructure/repository/abstraction/IUserRepository.interface";


@Injectable()
export default class AuthService implements AuthAbstraction {

    constructor(
        @Inject("IUserRepository") private readonly _repository: IUserRespository,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway,
        @Inject("IJwtService") private readonly jwt: IJwtService) { }

    
    async login(email: string, pwd: string): Promise<string> {
            const user = await this._repository.findUserByEmail(email);
            if(await this.checkPassword(pwd, user.Hash)) {
                return this.jwt.encodeJwt(user);
            };
            throw new Error("A senha ou usuario encontram-se incorretos.");
    };

    private async checkPassword(pwd: string, hash: string): Promise<boolean> {
        this.logger.log(`Comparando senha com hash.... [AuthService]`)
        return bcrypt.compare(pwd, hash)
    }

}