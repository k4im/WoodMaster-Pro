import { Injectable } from '@nestjs/common';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { DatabaseService } from 'src/outbound/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';


@Injectable()
export class AuthRepositoryService {

    constructor(
        private readonly database: DatabaseService,
        private readonly logger: CustomLogger,
        private readonly jwt: JwtService){}

    async login(email: string, senha: string) {
        try {
            let result = await this.database.usuario.findUnique({
                where: {
                    Email: email 
                },
                select: {
                    Uuid: true,
                    Email: true,
                    Senha: true,
                    Empresa: {select: {Uuid: true}},
                    Role: {select: {Nome: true, Permissoes: {select: {Acao: true}}}}
                },
            });
            this.logger.log("Efetuado busca de usuario. [Repository] - [Metodo] - [Login]");
            this.logger.log("Comparando senha de acesso. [Repository] - [Metodo] - [Login]");
            if(await bcrypt.compare(senha, result.Senha)) {
                this.logger.log("Senha de acesso valida, emitindo JWT.... [Repository] - [Metodo] - [Login]");
                const payload = {
                    user: result.Uuid, 
                    companyId: result.Empresa.Uuid, 
                    role: result.Role, 
                    permissions: [...result.Role.Permissoes]
                };
                const jwt = this.jwt.sign(payload)
                return jwt;
            }
            this.logger.error(`Senha informada é invalida. [Repository] - [Metodo] - [Login]`);

        } catch (error) {
            this.logger.error(`Houve um erro ao tentar logar o usuario. [Repository] - [Metodo] - [Login]: ${error}`);
            
        }
    }

}
