/*
  Warnings:

  - You are about to alter the column `DataDeRemocao` on the `Permissoes` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `EmpresaId` on the `Pessoa` table. All the data in the column will be lost.
  - You are about to alter the column `DataDeRemocao` on the `Role` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `EmpresaId` on the `Usuario` table. All the data in the column will be lost.
  - You are about to alter the column `DataInativacao` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the `Empresa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Pessoa` DROP FOREIGN KEY `Pessoa_EmpresaId_fkey`;

-- DropForeignKey
ALTER TABLE `Usuario` DROP FOREIGN KEY `Usuario_EmpresaId_fkey`;

-- AlterTable
ALTER TABLE `Permissoes` MODIFY `DataDeRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Pessoa` DROP COLUMN `EmpresaId`;

-- AlterTable
ALTER TABLE `Role` MODIFY `DataDeRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Usuario` DROP COLUMN `EmpresaId`,
    MODIFY `DataInativacao` TIMESTAMP NULL;

-- DropTable
DROP TABLE `Empresa`;
