
import * as bcrypt from 'bcrypt';

export default class Password  {
    value: string

    constructor(password: string) {
        this.value = this.validatePassword(password); 
    }

    /**
     * Efetua a validação da password e caso a mesma encontra-se valida
     * estará efetuando o hash da password.
     * @param password string contendo a senha para validação
     * @returns string | Error
     */
    private validatePassword(password: string) { 
        const regexExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if(regexExp.test(password)) return this.hashPassword(password)
        throw new Error("A senha deve conter entre 8 e 16 caracteres, sendo letras maiusculas, minusculas e numeros.");
    }

    /**
     * @description Estará recebendo uma senha para efetuar o processo de hash.
     * @param password recebe a senha para efetuar o procesos de hash
     * @returns string
     */
    private hashPassword(password: string) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync());         
    }

}