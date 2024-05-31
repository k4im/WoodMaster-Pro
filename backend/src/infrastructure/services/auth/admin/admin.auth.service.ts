/**
 * Auth de administradores.
 * 
 * O serviço poderá ser utilizado para um tenant
 * que já encontra-se cadastrado no sistema
 * realizar a operação de  login dentro do sistema.
 * 
 * @author João Victor
 */
import { Inject, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import IUserRespository from "src/infrastructure/repository/abstraction/IUserRepository.interface";
import ITenantRepository from "src/infrastructure/repository/abstraction/ITenantRepository.interface";
import AuthAbstraction from "../abstrations/AuthAbstrancion";
import IJwtService from "../../jwt/IJwtService";
import { IAdministratorRepository } from "src/infrastructure/repository/abstraction/IAdministratorRepository.interface";


@Injectable()
export default class AdmAuthService implements AuthAbstraction {

    constructor(
        @Inject("IAdministratorRepository") private readonly admRepository: IAdministratorRepository,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway,
        @Inject("IJwtService") private readonly jwt: IJwtService) { }

    /**
     * Efetua o processo de login de um usuario 
     * e realiza a emissão do token se valido.
     * @param email recebe o email para autenticação
     * @param pwd senha para verificação.
     * @returns Token
     */
    async login(email: string, pwd: string): Promise<string> {
        const admin = await this.admRepository.getAdministratorByEmail(email);
        if(!admin) 
            throw new Error("Administrator not founded.")
        
        if(await this.checkPassword(pwd, admin.Password.value)) {
            const payload = {email: email}
            return this.jwt.encodeJwt(payload);
        }
        
        throw new Error("Email or password invalid.");
    };
    
    /**
     * Efetua a verificação e validação se a senha de acesso confere com a senha
     * fornecida pelo o usuario.
     * @param pwd recebe a senha bruta
     * @param hash recebe o hash de senha
     * @returns boolean
     */
    private async checkPassword(pwd: string, hash: string): Promise<boolean> {
        this.logger.log(`Comparando senha com hash.... [AuthService]`)
        return bcrypt.compare(pwd, hash)
    }

}