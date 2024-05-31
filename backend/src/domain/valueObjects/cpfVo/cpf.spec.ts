import { Cpf } from './cpf.value.object';

describe("CpfVo", () => { 

    it("Deve criar um cpf valido", async () => {
        const cpfValido = '85532236046';
        const cpf = new Cpf(cpfValido);
        expect(cpf.value).toBe(cpfValido);
    });
    it("Deve gerar exceção ao tentar criar um cpf que não contém apenas numeros", async () => {
        const cpfInvalido = '855.322.360-46';
        expect(() => new Cpf(cpfInvalido)).toThrow("O CPF deverá ser composto apenas de numero.")

    });

    it("Deve gerar exceção informando que todos os numeros são iguais ao tentar criar o CPF", async () => {
        const cpfInvalido = '11111111111';
        expect(() => new Cpf(cpfInvalido)).toThrow("Todos os digitos do cpf não podem ser iguais.")
    });

    it("Deve gerar exceção informando que o CPF não é valido", async () => {
        const cpfInvalido = '01209663184';
        expect(() => new Cpf(cpfInvalido)).toThrow("Cpf não é valido.")
    });
})