/*
  Warnings:

  - You are about to alter the column `dataRemocao` on the `Estoque` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `DataDeRemocao` on the `Permissoes` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `dataRemocao` on the `Pessoa` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `dataRemocao` on the `PessoaEnderecos` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `dataRemocao` on the `PessoaTelefones` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `dataRemocao` on the `Produtos` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `DataDeRemocao` on the `Role` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `dataRemocao` on the `Servicos` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `dataRemocao` on the `Tenant` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `dataRemocao` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `Estoque` MODIFY `dataRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Permissoes` MODIFY `DataDeRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Pessoa` MODIFY `dataRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `PessoaEnderecos` MODIFY `dataRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `PessoaTelefones` MODIFY `dataRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Produtos` MODIFY `dataRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Role` MODIFY `DataDeRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Servicos` MODIFY `dataRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Tenant` MODIFY `dataRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Usuario` MODIFY `dataRemocao` TIMESTAMP NULL;

-- CreateTable
CREATE TABLE `Administradores` (
    `Uuid` VARCHAR(191) NULL,
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Inativo` BOOLEAN NOT NULL DEFAULT false,
    `dataCriacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataUpdate` DATETIME(3) NULL,
    `dataRemocao` TIMESTAMP NULL,

    UNIQUE INDEX `Administradores_Uuid_key`(`Uuid`),
    UNIQUE INDEX `Administradores_Email_key`(`Email`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
