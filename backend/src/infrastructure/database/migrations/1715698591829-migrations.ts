import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1715698591829 implements MigrationInterface {
    name = 'Migrations1715698591829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) NULL, \`Action\` varchar(255) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`roleId\` int NULL, UNIQUE INDEX \`IDX_9111972adaf76939fd91073c59\` (\`Uuid\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) NULL, \`Name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_df583b6c33bb4457408b5898ff\` (\`Uuid\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) NULL, \`Name\` varchar(255) NOT NULL, \`Price\` decimal NOT NULL, \`TotalItens\` int NOT NULL, \`BarCode\` varchar(255) NULL, \`Column\` varchar(255) NULL, \`Shelf\` varchar(255) NULL, \`stockId\` int NULL, PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`stock\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) NULL, PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tenant\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) NULL, \`Name\` varchar(255) NOT NULL, \`IsActive\` tinyint NOT NULL DEFAULT 1, \`stockId\` int NULL, UNIQUE INDEX \`IDX_880c9526ab0b79e3b147e4d0c5\` (\`Uuid\`), UNIQUE INDEX \`REL_3176ac89b41d2af6731cb08eac\` (\`stockId\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) NULL, \`IsActive\` tinyint NULL DEFAULT 1, \`EmailAddr\` varchar(255) NOT NULL, \`HashPassword\` varchar(255) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`roleId\` int NULL, \`TenantId\` int NULL, UNIQUE INDEX \`IDX_35e9849a803a05e13825f000ff\` (\`Uuid\`), UNIQUE INDEX \`IDX_f536c68ccffbcd3b53539a8976\` (\`EmailAddr\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`phone\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) NULL, \`Phone\` varchar(255) NULL, \`IsPrimary\` tinyint NOT NULL, \`personId\` int NULL, UNIQUE INDEX \`IDX_a677e1cb920d26713b14ecdb0b\` (\`Uuid\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`person\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) NULL, \`Name\` varchar(255) NULL, \`Email\` varchar(255) NOT NULL, \`FathersName\` varchar(255) NULL, \`MothersName\` varchar(255) NULL, \`Cpf\` varchar(255) NULL, \`Rg\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`IsClient\` tinyint NOT NULL DEFAULT 0, \`IsSupplier\` tinyint NOT NULL DEFAULT 0, \`IsOperator\` tinyint NOT NULL DEFAULT 0, \`IsCollaborator\` tinyint NOT NULL DEFAULT 0, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`TenantId\` int NULL, UNIQUE INDEX \`IDX_a67d9b1a5a0415ca02aa099f0b\` (\`Uuid\`), UNIQUE INDEX \`IDX_f602afcab00a712029c90b51e6\` (\`Email\`), UNIQUE INDEX \`IDX_2edb09c7c6c68bc47eb3d77fc3\` (\`Cpf\`), UNIQUE INDEX \`IDX_8705b068e5b71ed4263c959616\` (\`Rg\`), UNIQUE INDEX \`REL_83b775da14886d352de2a4cac0\` (\`userId\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`address\` (\`Id\` int NOT NULL AUTO_INCREMENT, \`Uuid\` varchar(36) NULL, \`StreetName\` varchar(255) NULL, \`City\` varchar(255) NULL, \`Neighborhood\` varchar(255) NULL, \`ZipCode\` varchar(255) NULL, \`Country\` varchar(255) NULL, \`State\` varchar(255) NULL, \`Observations\` varchar(255) NULL, \`personId\` int NULL, PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD CONSTRAINT \`FK_36d7b8e1a331102ec9161e879ce\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_f81d90fc0d025b50a3bfcf7dba7\` FOREIGN KEY (\`stockId\`) REFERENCES \`stock\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`tenant\` ADD CONSTRAINT \`FK_3176ac89b41d2af6731cb08eac1\` FOREIGN KEY (\`stockId\`) REFERENCES \`stock\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_d123f7f04a00a820a739ada2ce9\` FOREIGN KEY (\`TenantId\`) REFERENCES \`tenant\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`phone\` ADD CONSTRAINT \`FK_6f375f4141afe2e924bd34be5df\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_83b775da14886d352de2a4cac01\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_c13c06ac1691482752259d6b617\` FOREIGN KEY (\`TenantId\`) REFERENCES \`tenant\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_e3d0b5ba0387be88105ad7683bb\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`Id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_e3d0b5ba0387be88105ad7683bb\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_c13c06ac1691482752259d6b617\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_83b775da14886d352de2a4cac01\``);
        await queryRunner.query(`ALTER TABLE \`phone\` DROP FOREIGN KEY \`FK_6f375f4141afe2e924bd34be5df\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_d123f7f04a00a820a739ada2ce9\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`ALTER TABLE \`tenant\` DROP FOREIGN KEY \`FK_3176ac89b41d2af6731cb08eac1\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_f81d90fc0d025b50a3bfcf7dba7\``);
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP FOREIGN KEY \`FK_36d7b8e1a331102ec9161e879ce\``);
        await queryRunner.query(`DROP TABLE \`address\``);
        await queryRunner.query(`DROP INDEX \`REL_83b775da14886d352de2a4cac0\` ON \`person\``);
        await queryRunner.query(`DROP INDEX \`IDX_8705b068e5b71ed4263c959616\` ON \`person\``);
        await queryRunner.query(`DROP INDEX \`IDX_2edb09c7c6c68bc47eb3d77fc3\` ON \`person\``);
        await queryRunner.query(`DROP INDEX \`IDX_f602afcab00a712029c90b51e6\` ON \`person\``);
        await queryRunner.query(`DROP INDEX \`IDX_a67d9b1a5a0415ca02aa099f0b\` ON \`person\``);
        await queryRunner.query(`DROP TABLE \`person\``);
        await queryRunner.query(`DROP INDEX \`IDX_a677e1cb920d26713b14ecdb0b\` ON \`phone\``);
        await queryRunner.query(`DROP TABLE \`phone\``);
        await queryRunner.query(`DROP INDEX \`IDX_f536c68ccffbcd3b53539a8976\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_35e9849a803a05e13825f000ff\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_3176ac89b41d2af6731cb08eac\` ON \`tenant\``);
        await queryRunner.query(`DROP INDEX \`IDX_880c9526ab0b79e3b147e4d0c5\` ON \`tenant\``);
        await queryRunner.query(`DROP TABLE \`tenant\``);
        await queryRunner.query(`DROP TABLE \`stock\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP INDEX \`IDX_df583b6c33bb4457408b5898ff\` ON \`role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP INDEX \`IDX_9111972adaf76939fd91073c59\` ON \`permissions\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
    }

}
