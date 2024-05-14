import Password from "./password.value.object";

describe("passwordVo", () => {

    it("Deve criar uma senha valida", async () =>  {
        const validPassword = "Gn$5P4gs23@$%";
        expect(() => new Password(validPassword)).not.toBe(null);
    })

    it("Deve gerar uma exceção ao criar uma senha invalida", async () => {
        const invalidPassword = 'asd';
        expect(() => new Password(invalidPassword)).toThrow("A senha deve conter entre 8 e 16 caracteres, sendo letras maiusculas, minusculas e numeros.")
    })
})