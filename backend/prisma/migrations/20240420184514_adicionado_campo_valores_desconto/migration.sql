/*
  Warnings:

  - You are about to alter the column `dataRemocao` on the `Administradores` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
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
  - Added the required column `Valor` to the `Produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Valor` to the `Servicos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Administradores` MODIFY `dataRemocao` TIMESTAMP NULL;

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
ALTER TABLE `Produtos` ADD COLUMN `Valor` DECIMAL(65, 30) NOT NULL,
    MODIFY `dataRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Role` MODIFY `DataDeRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Servicos` ADD COLUMN `Desconto` DECIMAL(65, 30) NULL,
    ADD COLUMN `Valor` DECIMAL(65, 30) NOT NULL,
    MODIFY `dataRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Tenant` MODIFY `dataRemocao` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Usuario` MODIFY `dataRemocao` TIMESTAMP NULL;
