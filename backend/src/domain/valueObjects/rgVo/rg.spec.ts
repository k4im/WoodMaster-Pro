import { RgDocument } from "./rg.value.object";

describe("RgVo", () => {
    it("Deve criar um RG valido", async () => {
        const rgValido = "48.284.708-6";
        const rg = new RgDocument(rgValido);
        expect(rg.value).toEqual(rgValido);
    });

    it("Deve gerar exceção ao criar RG invalido", async () => {
        const rgInvalido = 'asdasd';
        expect(() => new RgDocument(rgInvalido)).toThrow(`O RG informado encontra-se invalido.
        Por favor informe um RG valido.`);
    })
})