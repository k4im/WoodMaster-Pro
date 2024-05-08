import { Email } from "./email.value.object";

describe("EmailVo", () => {

    it("Deve criar um endereço de email valido", async() => {
        const emailValido = "exemplo@exemplo.com.br";
        const email = new Email(emailValido);
        expect(email.email).toEqual(emailValido);
    });

    it("Deve gerar exceção ao tentar cirar email invalido", async() => {
        const emailInvalido = 'emailInvalido';
        expect(() => new Email(emailInvalido)).toThrow("Email invalido, por favor insira um valor valido.");
    })
})