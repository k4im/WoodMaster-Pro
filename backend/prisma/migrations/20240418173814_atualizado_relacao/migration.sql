/*
  Warnings:

  - You are about to alter the column `DataDeRemocao` on the `Empresa` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `DataDeRemocao` on the `Permissoes` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `DataDeRemocao` on the `Role` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `DataInativacao` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `Permissoes` DROP FOREIGN KEY `Permissoes_RoleId_fkey`;

-- DropForeignKey
ALTER TABLE `Usuario` DROP FOREIGN KEY `Usuario_EmpresaId_fkey`;

-- AlterTable
ALTER TABLE `Empresa` MODIFY `DataDeRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Permissoes` MODIFY `DataDeRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Role` MODIFY `DataDeRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Usuario` MODIFY `DataInativacao` TIMESTAMP NULL;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_EmpresaId_fkey` FOREIGN KEY (`EmpresaId`) REFERENCES `Empresa`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Permissoes` ADD CONSTRAINT `Permissoes_RoleId_fkey` FOREIGN KEY (`RoleId`) REFERENCES `Role`(`Id`) ON DELETE NO ACTION ON UPDATE CASCADE;
