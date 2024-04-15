-- CreateTable
CREATE TABLE `Pessoa` (
    `Uuid` VARCHAR(191) NOT NULL,
    `Handle` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(191) NULL,
    `Apelido` VARCHAR(191) NULL,
    `Matricula` VARCHAR(191) NOT NULL,
    `Codigo` INTEGER NULL,
    `Datainclusao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Inativo` BOOLEAN NOT NULL DEFAULT false,
    `Estrangeiro` BOOLEAN NOT NULL DEFAULT false,
    `Email` VARCHAR(191) NOT NULL,
    `Cliente` BOOLEAN NULL,
    `Colaborador` BOOLEAN NULL,
    `Fornecedor` BOOLEAN NULL,
    `Tipopj` BOOLEAN NULL,
    `Datanascimento` DATETIME(3) NULL,
    `Estadocivil` VARCHAR(191) NULL,
    `Pai` VARCHAR(191) NULL,
    `Mae` VARCHAR(191) NULL,
    `Sexo` VARCHAR(191) NULL,
    `Rg` VARCHAR(191) NULL,
    `Emissor` VARCHAR(191) NULL,
    `Ufemissor` VARCHAR(191) NULL,
    `Datarg` DATETIME(3) NULL,
    `Cpf` VARCHAR(191) NULL,
    `Ctps` VARCHAR(191) NULL,
    `Datactps` DATETIME(3) NULL,
    `Nrpis` VARCHAR(191) NULL,
    `Datapis` DATETIME(3) NULL,
    `Regprofnumero` VARCHAR(191) NULL,
    `Conselho` VARCHAR(191) NULL,
    `Ufconselho` VARCHAR(191) NULL,
    `Regprofserie` VARCHAR(191) NULL,
    `Profissao` VARCHAR(191) NULL,
    `Dependentes` INTEGER NULL,
    `Razaosocial` VARCHAR(191) NULL,
    `Cnpj` VARCHAR(191) NULL,
    `Inscricaoestadual` VARCHAR(191) NULL,
    `Inscricaomunicipal` VARCHAR(191) NULL,
    `Objetosocial` VARCHAR(191) NULL,
    `Observacoes` VARCHAR(191) NULL,

    UNIQUE INDEX `Pessoa_Uuid_key`(`Uuid`),
    PRIMARY KEY (`Handle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PessoaEnderecos` (
    `Handle` INTEGER NOT NULL AUTO_INCREMENT,
    `PessoaId` INTEGER NOT NULL,
    `Logradouro` VARCHAR(191) NULL,
    `Complemento` VARCHAR(191) NULL,
    `Bairro` VARCHAR(191) NULL,
    `Caixapostal` VARCHAR(191) NULL,
    `Pais` VARCHAR(191) NULL,
    `Estado` VARCHAR(191) NULL,
    `Municipio` VARCHAR(191) NULL,
    `Cep` VARCHAR(191) NULL,
    `Enderecoprincipal` BOOLEAN NOT NULL,
    `Observacoes` VARCHAR(191) NULL,

    PRIMARY KEY (`Handle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TiposEnderecos` (
    `Handle` INTEGER NOT NULL,
    `Descricao` VARCHAR(191) NULL,
    `PessoaEnderecoId` INTEGER NOT NULL,

    PRIMARY KEY (`Handle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PessoaTelefones` (
    `Handle` INTEGER NOT NULL,
    `PessoaId` INTEGER NOT NULL,
    `Telefone` VARCHAR(191) NULL,
    `Ddi` VARCHAR(191) NULL,
    `Ddd` VARCHAR(191) NULL,
    `Ramal` VARCHAR(191) NULL,
    `Telefonoprincipal` BOOLEAN NULL,
    `TipoTelefoneId` INTEGER NOT NULL,
    `Observacoes` VARCHAR(191) NULL,

    PRIMARY KEY (`Handle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TiposTelefone` (
    `Handle` INTEGER NOT NULL,
    `Descricao` VARCHAR(191) NULL,

    PRIMARY KEY (`Handle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `Uuid` INTEGER NOT NULL,
    `Handle` INTEGER NOT NULL,
    `PessoaId` INTEGER NOT NULL,
    `Email` VARCHAR(191) NULL,
    `Senha` VARCHAR(191) NULL,
    `Inativo` BOOLEAN NULL,

    UNIQUE INDEX `Usuario_PessoaId_key`(`PessoaId`),
    UNIQUE INDEX `Usuario_Email_key`(`Email`),
    INDEX `Usuario_Uuid_PessoaId_Email_idx`(`Uuid`, `PessoaId`, `Email`),
    PRIMARY KEY (`Handle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PessoaEnderecos` ADD CONSTRAINT `PessoaEnderecos_PessoaId_fkey` FOREIGN KEY (`PessoaId`) REFERENCES `Pessoa`(`Handle`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TiposEnderecos` ADD CONSTRAINT `TiposEnderecos_PessoaEnderecoId_fkey` FOREIGN KEY (`PessoaEnderecoId`) REFERENCES `PessoaEnderecos`(`Handle`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PessoaTelefones` ADD CONSTRAINT `PessoaTelefones_PessoaId_fkey` FOREIGN KEY (`PessoaId`) REFERENCES `Pessoa`(`Handle`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PessoaTelefones` ADD CONSTRAINT `PessoaTelefones_TipoTelefoneId_fkey` FOREIGN KEY (`TipoTelefoneId`) REFERENCES `TiposTelefone`(`Handle`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_PessoaId_fkey` FOREIGN KEY (`PessoaId`) REFERENCES `Pessoa`(`Handle`) ON DELETE CASCADE ON UPDATE CASCADE;
