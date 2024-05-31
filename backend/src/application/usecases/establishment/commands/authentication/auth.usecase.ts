import { Inject } from "@nestjs/common";
import { IAuthCommand } from "src/application/usecases/Abstrations/ICoomands.interface";
import AuthAbstraction from "src/infrastructure/services/auth/abstrations/AuthAbstrancion";

export default class AuthUseCase implements IAuthCommand { 

    constructor(@Inject("AuthAbstraction") private readonly authService: AuthAbstraction) {}
    
    async execute(email: string, senha: string): Promise<string> {
        try {
            return await this.authService.login(email, senha);
        } catch (error) {
            console.log(`Houve um erro ao tentar realizar a operação: ${error}`)            
        }
    }
}