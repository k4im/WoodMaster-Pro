import { Inject } from "@nestjs/common";
import AuthAbstraction from "src/infrastructure/services/auth/abstrations/AuthAbstrancion";
import { IAuthCommand } from "../../../Abstrations/ICoomands.interface";

export default class AuthUseCase implements IAuthCommand { 

    constructor(@Inject("AuthAbstraction") private readonly authService: AuthAbstraction) {}
    
    async execute(email: string, senha: string, userAgent: string): Promise<string> {
        try {
            return await this.authService.login(email, senha, userAgent);
        } catch (error) {
            console.log(`Houve um erro ao tentar realizar a operação: ${error}`)            
        }
    }
}