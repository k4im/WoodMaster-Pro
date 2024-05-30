/**
 * Representa a entidade de um administrator
 * 
 * a classe estará representando a entidade
 * de um administrador dentro do banco de dados
 * poderá ser utilizada para efetuar a criação
 * de um novo administrador dentro do banco de dados.
 * @author João Victor
 */

import Password from "../valueObjects/PasswordVo/password.value.object";
import { Email } from "../valueObjects/emailVo/email.value.object";

export default class Administrator { 

    Email: Email
    Password: Password
    IsActive: boolean = true;
     
    constructor(email: Email, password: Password) {
        this.Email = email,
        this.Password = password
    };

}