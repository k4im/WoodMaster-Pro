/**
 * Auth de tenants
 * 
 * O serviço poderá ser utilizado para um tenant
 * que já encontra-se cadastrado no sistema
 * realizar a operação de  login dentro do sistema.
 * 
 */

import { Inject, Injectable } from "@nestjs/common";
import IJwtService from "../jwt/IJwtService";
import AuthAbstraction from "./abstrations/AuthAbstrancion";
import * as bcrypt from 'bcrypt';
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import IUserRespository from "src/infrastructure/repository/abstraction/IUserRepository.interface";
import ITenantRepository from "src/infrastructure/repository/abstraction/ITenantRepository.interface";


@Injectable()
export default class AuthService implements AuthAbstraction {

    constructor(
        @Inject("ITenantRepository") private readonly _repositoryTenant: ITenantRepository,
        @Inject("IUserRepository") private readonly _repository: IUserRespository,
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
            const user = await this._repository.findUserByEmail(email);
            const tenant  = await this._repositoryTenant.findTenantByUuid(user.Tenant);
            if(tenant.IsActive) {
                if(await this.checkPassword(pwd, user.Hash)) {
                    return this.jwt.encodeJwt(user);
                };
            }
            throw new Error("Senha ou usuário incorretos.");
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