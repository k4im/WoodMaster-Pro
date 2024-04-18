-- CreateTable
CREATE TABLE `Pessoa` (
    `Uuid` VARCHAR(191) NOT NULL,
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(191) NULL,
    `Apelido` VARCHAR(191) NULL,
    `Matricula` VARCHAR(191) NULL,
    `Codigo` INTEGER NULL,
    `Datainclusao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Inativo` BOOLEAN NULL DEFAULT false,
    `Estrangeiro` BOOLEAN NULL DEFAULT false,
    `Email` VARCHAR(191) NULL,
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
    `EmpresaId` INTEGER NOT NULL,

    UNIQUE INDEX `Pessoa_Uuid_key`(`Uuid`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PessoaEnderecos` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
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

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PessoaTelefones` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `PessoaId` INTEGER NOT NULL,
    `Telefone` VARCHAR(191) NULL,
    `Ddi` VARCHAR(191) NULL,
    `Ddd` VARCHAR(191) NULL,
    `Ramal` VARCHAR(191) NULL,
    `Telefonoprincipal` BOOLEAN NULL,
    `Observacoes` VARCHAR(191) NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `Uuid` VARCHAR(191) NOT NULL,
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `PessoaId` INTEGER NOT NULL,
    `Email` VARCHAR(191) NULL,
    `Senha` VARCHAR(191) NULL,
    `Inativo` BOOLEAN NULL,
    `DataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `DataAtualizacao` DATETIME(3) NULL,
    `DataInativacao` TIMESTAMP NULL,
    `RoleId` INTEGER NOT NULL,
    `EmpresaId` INTEGER NOT NULL,

    UNIQUE INDEX `Usuario_Uuid_key`(`Uuid`),
    UNIQUE INDEX `Usuario_PessoaId_key`(`PessoaId`),
    UNIQUE INDEX `Usuario_Email_key`(`Email`),
    INDEX `Usuario_Uuid_PessoaId_Email_RoleId_idx`(`Uuid`, `PessoaId`, `Email`, `RoleId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `Uuid` VARCHAR(191) NOT NULL,
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(191) NOT NULL,
    `DataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `DataAtualizacao` DATETIME(3) NULL,
    `DataDeRemocao` TIMESTAMP NULL,

    UNIQUE INDEX `Role_Uuid_key`(`Uuid`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permissoes` (
    `Uuid` VARCHAR(191) NOT NULL,
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `RoleId` INTEGER NOT NULL,
    `Acao` VARCHAR(191) NOT NULL,
    `Subject` VARCHAR(191) NOT NULL,
    `DataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `DataAtualizacao` DATETIME(3) NULL,
    `DataDeRemocao` TIMESTAMP NULL,

    UNIQUE INDEX `Permissoes_Uuid_key`(`Uuid`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empresa` (
    `Uuid` VARCHAR(191) NOT NULL,
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(191) NOT NULL,
    `DataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `DataAtualizacao` DATETIME(3) NULL,
    `DataDeRemocao` TIMESTAMP NULL,

    UNIQUE INDEX `Empresa_Uuid_key`(`Uuid`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pessoa` ADD CONSTRAINT `Pessoa_EmpresaId_fkey` FOREIGN KEY (`EmpresaId`) REFERENCES `Empresa`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PessoaEnderecos` ADD CONSTRAINT `PessoaEnderecos_PessoaId_fkey` FOREIGN KEY (`PessoaId`) REFERENCES `Pessoa`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PessoaTelefones` ADD CONSTRAINT `PessoaTelefones_PessoaId_fkey` FOREIGN KEY (`PessoaId`) REFERENCES `Pessoa`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_PessoaId_fkey` FOREIGN KEY (`PessoaId`) REFERENCES `Pessoa`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_RoleId_fkey` FOREIGN KEY (`RoleId`) REFERENCES `Role`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_EmpresaId_fkey` FOREIGN KEY (`EmpresaId`) REFERENCES `Empresa`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Permissoes` ADD CONSTRAINT `Permissoes_RoleId_fkey` FOREIGN KEY (`RoleId`) REFERENCES `Role`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
