/*
  Warnings:

  - You are about to alter the column `DataDeRemocao` on the `Empresa` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `DataDeRemocao` on the `Permissoes` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `DataDeRemocao` on the `Role` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `DataInativacao` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - A unique constraint covering the columns `[EmpresaId]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Empresa` MODIFY `DataDeRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Permissoes` MODIFY `DataDeRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Role` MODIFY `DataDeRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Usuario` MODIFY `DataInativacao` TIMESTAMP NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_EmpresaId_key` ON `Usuario`(`EmpresaId`);
