import { Injectable } from '@nestjs/common';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { DatabaseService } from 'src/outbound/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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
                    Nome: true,
                    Role: {select: {Nome: true, Permissoes: {select: {Acao: true}}}}
                },
            });
            this.logger.log("Efetuado busca de usuario. [Auth Repository] - [Metodo] - [Login]");
            this.logger.log("Comparando senha de acesso. [Auth Repository] - [Metodo] - [Login]");
            if(await bcrypt.compare(senha, result.Senha)) {
                this.logger.log("Senha de acesso valida, emitindo JWT.... [Auth Repository] - [Metodo] - [Login]");
                const payload = {
                    user: result.Uuid, 
                    username: result.Nome,
                    role: result.Role, 
                    permissions: [...result.Role.Permissoes]
                };
                const jwt = this.jwt.sign(payload)
                await this.database.$disconnect();
                return jwt;
            }
            this.logger.error(`Senha informada é invalida. [Auth Repository] - [Metodo] - [Login]`);
            await this.database.$disconnect();

        } catch (error) {
            this.logger.error(`Houve um erro ao tentar logar o usuario. [Auth Repository] - [Metodo] - [Login]: ${error}`);
            await this.database.$disconnect();
        }
    }

}
