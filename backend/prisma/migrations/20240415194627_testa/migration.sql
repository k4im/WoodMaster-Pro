/*
  Warnings:

  - The primary key for the `Pessoa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Handle` on the `Pessoa` table. All the data in the column will be lost.
  - The primary key for the `PessoaEnderecos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Handle` on the `PessoaEnderecos` table. All the data in the column will be lost.
  - The primary key for the `PessoaTelefones` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Handle` on the `PessoaTelefones` table. All the data in the column will be lost.
  - The primary key for the `TiposEnderecos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Handle` on the `TiposEnderecos` table. All the data in the column will be lost.
  - The primary key for the `TiposTelefone` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Handle` on the `TiposTelefone` table. All the data in the column will be lost.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Handle` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Uuid]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Id` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Id` to the `PessoaEnderecos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Id` to the `PessoaTelefones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Id` to the `TiposEnderecos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Id` to the `TiposTelefone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Id` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PessoaEnderecos` DROP FOREIGN KEY `PessoaEnderecos_PessoaId_fkey`;

-- DropForeignKey
ALTER TABLE `PessoaTelefones` DROP FOREIGN KEY `PessoaTelefones_PessoaId_fkey`;

-- DropForeignKey
ALTER TABLE `PessoaTelefones` DROP FOREIGN KEY `PessoaTelefones_TipoTelefoneId_fkey`;

-- DropForeignKey
ALTER TABLE `TiposEnderecos` DROP FOREIGN KEY `TiposEnderecos_PessoaEnderecoId_fkey`;

-- DropForeignKey
ALTER TABLE `Usuario` DROP FOREIGN KEY `Usuario_PessoaId_fkey`;

-- AlterTable
ALTER TABLE `Pessoa` DROP PRIMARY KEY,
    DROP COLUMN `Handle`,
    ADD COLUMN `Id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `Matricula` VARCHAR(191) NULL,
    MODIFY `Inativo` BOOLEAN NULL DEFAULT false,
    MODIFY `Estrangeiro` BOOLEAN NULL DEFAULT false,
    MODIFY `Email` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `PessoaEnderecos` DROP PRIMARY KEY,
    DROP COLUMN `Handle`,
    ADD COLUMN `Id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `PessoaTelefones` DROP PRIMARY KEY,
    DROP COLUMN `Handle`,
    ADD COLUMN `Id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `TiposEnderecos` DROP PRIMARY KEY,
    DROP COLUMN `Handle`,
    ADD COLUMN `Id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `TiposTelefone` DROP PRIMARY KEY,
    DROP COLUMN `Handle`,
    ADD COLUMN `Id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `Usuario` DROP PRIMARY KEY,
    DROP COLUMN `Handle`,
    ADD COLUMN `Id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `Uuid` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`Id`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_Uuid_key` ON `Usuario`(`Uuid`);

-- AddForeignKey
ALTER TABLE `PessoaEnderecos` ADD CONSTRAINT `PessoaEnderecos_PessoaId_fkey` FOREIGN KEY (`PessoaId`) REFERENCES `Pessoa`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TiposEnderecos` ADD CONSTRAINT `TiposEnderecos_PessoaEnderecoId_fkey` FOREIGN KEY (`PessoaEnderecoId`) REFERENCES `PessoaEnderecos`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PessoaTelefones` ADD CONSTRAINT `PessoaTelefones_PessoaId_fkey` FOREIGN KEY (`PessoaId`) REFERENCES `Pessoa`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PessoaTelefones` ADD CONSTRAINT `PessoaTelefones_TipoTelefoneId_fkey` FOREIGN KEY (`TipoTelefoneId`) REFERENCES `TiposTelefone`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_PessoaId_fkey` FOREIGN KEY (`PessoaId`) REFERENCES `Pessoa`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
