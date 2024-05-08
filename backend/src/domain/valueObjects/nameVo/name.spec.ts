import { Name } from "./name.value.object";

describe("NameVo", () => {

    it("Deve criar um nome valido", async () => {
        const firsNameValido = "João Victor";
        const lastNameValido = "da silva";
        const nome = new Name(firsNameValido, lastNameValido);
        expect(nome.FirsName).toEqual(firsNameValido);
        expect(nome.LastName).toEqual(lastNameValido);
    });

    it("Deve gerar exceção ao criar nome com valor invalido", async () => {
        const firsNameValido = "João Victor";
        const lastNameInvalido = "15369";
        expect(() => new Name(firsNameValido, lastNameInvalido)).toThrow(`O nome inserido é invalido. 
        Por favor insira um nome contendo apenas letras`);
    });
})