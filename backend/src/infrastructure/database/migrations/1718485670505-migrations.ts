import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1718485670505 implements MigrationInterface {
    name = 'Migrations1718485670505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) COLLATE "utf8_general_ci" NULL, \`Name\` varchar(255) NOT NULL, \`Price\` decimal NOT NULL, \`TotalItens\` int NOT NULL, \`BarCode\` varchar(255) NULL, \`Column\` varchar(255) NULL, \`Shelf\` varchar(255) NULL, \`stockId\` int NULL, UNIQUE INDEX \`IDX_a7207424fa5d74c694b2249bd4\` (\`Uuid\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) COLLATE "utf8_general_ci" NULL, \`Name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_df583b6c33bb4457408b5898ff\` (\`Uuid\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`address\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) NULL, \`StreetName\` varchar(255) NULL, \`City\` varchar(255) NULL, \`Neighborhood\` varchar(255) NULL, \`ZipCode\` varchar(255) NULL, \`Country\` varchar(255) NULL, \`State\` varchar(255) NULL, \`Observations\` varchar(255) NULL, \`personId\` int NULL, PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`phone\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) COLLATE "utf8_general_ci" NULL, \`Phone\` varchar(255) NULL, \`IsPrimary\` tinyint NOT NULL, \`personId\` int NULL, UNIQUE INDEX \`IDX_a677e1cb920d26713b14ecdb0b\` (\`Uuid\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`person\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) COLLATE "utf8_general_ci" NULL, \`Name\` varchar(255) NULL, \`Email\` varchar(255) NOT NULL, \`FathersName\` varchar(255) NULL, \`MothersName\` varchar(255) NULL, \`Cpf\` varchar(255) NULL, \`Rg\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`IsClient\` tinyint NOT NULL DEFAULT 0, \`IsSupplier\` tinyint NOT NULL DEFAULT 0, \`IsOperator\` tinyint NOT NULL DEFAULT 0, \`IsCollaborator\` tinyint NOT NULL DEFAULT 0, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`TenantId\` int NULL, UNIQUE INDEX \`IDX_a67d9b1a5a0415ca02aa099f0b\` (\`Uuid\`), UNIQUE INDEX \`IDX_f602afcab00a712029c90b51e6\` (\`Email\`), UNIQUE INDEX \`IDX_2edb09c7c6c68bc47eb3d77fc3\` (\`Cpf\`), UNIQUE INDEX \`IDX_8705b068e5b71ed4263c959616\` (\`Rg\`), UNIQUE INDEX \`REL_83b775da14886d352de2a4cac0\` (\`userId\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) COLLATE "utf8_general_ci" NULL, \`IsActive\` tinyint NULL DEFAULT 1, \`EmailAddr\` varchar(255) NOT NULL, \`HashPassword\` varchar(255) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`roleId\` int NULL, \`TenantId\` int NULL, UNIQUE INDEX \`IDX_35e9849a803a05e13825f000ff\` (\`Uuid\`), UNIQUE INDEX \`IDX_f536c68ccffbcd3b53539a8976\` (\`EmailAddr\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_item\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) COLLATE "utf8_general_ci" NULL, \`Name\` varchar(255) NOT NULL, \`Price\` decimal NOT NULL, \`Quantity\` int NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`orderIdId\` int NULL, UNIQUE INDEX \`IDX_48c49fd17d80ab1ec799b11c23\` (\`Uuid\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) COLLATE "utf8_general_ci" NULL, \`OrderType\` varchar(255) NOT NULL, \`DeliveryAddress\` json NULL, \`Status\` varchar(255) NOT NULL, \`Observations\` varchar(255) NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`tenantId\` int NULL, UNIQUE INDEX \`IDX_bb2c0a3f67db7a656b1a1d4d02\` (\`Uuid\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tenant\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) COLLATE "utf8_general_ci" NULL, \`Name\` varchar(255) NOT NULL, \`IsActive\` tinyint NOT NULL DEFAULT 1, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`stockId\` int NULL, UNIQUE INDEX \`IDX_880c9526ab0b79e3b147e4d0c5\` (\`Uuid\`), UNIQUE INDEX \`REL_3176ac89b41d2af6731cb08eac\` (\`stockId\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`stock\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) COLLATE "utf8_general_ci" NULL, UNIQUE INDEX \`IDX_68d9da1b2b1a76db234791e39f\` (\`Uuid\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`administrator\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) COLLATE "utf8_general_ci" NULL, \`IsActive\` tinyint NULL DEFAULT 1, \`EmailAddr\` varchar(255) NOT NULL, \`HashPassword\` varchar(255) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b7d13040b5ba815ca3dc268e23\` (\`Uuid\`), UNIQUE INDEX \`IDX_16cf9bed99d7a97d554e4b4e19\` (\`EmailAddr\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_f81d90fc0d025b50a3bfcf7dba7\` FOREIGN KEY (\`stockId\`) REFERENCES \`stock\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_e3d0b5ba0387be88105ad7683bb\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`phone\` ADD CONSTRAINT \`FK_6f375f4141afe2e924bd34be5df\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_83b775da14886d352de2a4cac01\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_c13c06ac1691482752259d6b617\` FOREIGN KEY (\`TenantId\`) REFERENCES \`tenant\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_d123f7f04a00a820a739ada2ce9\` FOREIGN KEY (\`TenantId\`) REFERENCES \`tenant\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_06de9b4d54cfcc0a046e7542517\` FOREIGN KEY (\`orderIdId\`) REFERENCES \`order\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_7853202400ba8726242baa7a916\` FOREIGN KEY (\`tenantId\`) REFERENCES \`tenant\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`tenant\` ADD CONSTRAINT \`FK_3176ac89b41d2af6731cb08eac1\` FOREIGN KEY (\`stockId\`) REFERENCES \`stock\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query("INSERT INTO WoodMaster.administrator (Uuid, EmailAddr, HashPassword) VALUES('9faf97f7-e29d-47b0-8dcb-b25608db8f04', 'contato.vitorsantos@hotmail.com', '$2b$10$L2Ah4o6M4xFgZ5o7mH/20etN2xBmI6TbQ6CP.Jr9E3wiLPP8EUms2')")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tenant\` DROP FOREIGN KEY \`FK_3176ac89b41d2af6731cb08eac1\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_7853202400ba8726242baa7a916\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_06de9b4d54cfcc0a046e7542517\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_d123f7f04a00a820a739ada2ce9\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_c13c06ac1691482752259d6b617\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_83b775da14886d352de2a4cac01\``);
        await queryRunner.query(`ALTER TABLE \`phone\` DROP FOREIGN KEY \`FK_6f375f4141afe2e924bd34be5df\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_e3d0b5ba0387be88105ad7683bb\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_f81d90fc0d025b50a3bfcf7dba7\``);
        await queryRunner.query(`DROP INDEX \`IDX_16cf9bed99d7a97d554e4b4e19\` ON \`administrator\``);
        await queryRunner.query(`DROP INDEX \`IDX_b7d13040b5ba815ca3dc268e23\` ON \`administrator\``);
        await queryRunner.query(`DROP TABLE \`administrator\``);
        await queryRunner.query(`DROP INDEX \`IDX_68d9da1b2b1a76db234791e39f\` ON \`stock\``);
        await queryRunner.query(`DROP TABLE \`stock\``);
        await queryRunner.query(`DROP INDEX \`REL_3176ac89b41d2af6731cb08eac\` ON \`tenant\``);
        await queryRunner.query(`DROP INDEX \`IDX_880c9526ab0b79e3b147e4d0c5\` ON \`tenant\``);
        await queryRunner.query(`DROP TABLE \`tenant\``);
        await queryRunner.query(`DROP INDEX \`IDX_bb2c0a3f67db7a656b1a1d4d02\` ON \`order\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP INDEX \`IDX_48c49fd17d80ab1ec799b11c23\` ON \`order_item\``);
        await queryRunner.query(`DROP TABLE \`order_item\``);
        await queryRunner.query(`DROP INDEX \`IDX_f536c68ccffbcd3b53539a8976\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_35e9849a803a05e13825f000ff\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_83b775da14886d352de2a4cac0\` ON \`person\``);
        await queryRunner.query(`DROP INDEX \`IDX_8705b068e5b71ed4263c959616\` ON \`person\``);
        await queryRunner.query(`DROP INDEX \`IDX_2edb09c7c6c68bc47eb3d77fc3\` ON \`person\``);
        await queryRunner.query(`DROP INDEX \`IDX_f602afcab00a712029c90b51e6\` ON \`person\``);
        await queryRunner.query(`DROP INDEX \`IDX_a67d9b1a5a0415ca02aa099f0b\` ON \`person\``);
        await queryRunner.query(`DROP TABLE \`person\``);
        await queryRunner.query(`DROP INDEX \`IDX_a677e1cb920d26713b14ecdb0b\` ON \`phone\``);
        await queryRunner.query(`DROP TABLE \`phone\``);
        await queryRunner.query(`DROP TABLE \`address\``);
        await queryRunner.query(`DROP INDEX \`IDX_df583b6c33bb4457408b5898ff\` ON \`role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP INDEX \`IDX_a7207424fa5d74c694b2249bd4\` ON \`product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
