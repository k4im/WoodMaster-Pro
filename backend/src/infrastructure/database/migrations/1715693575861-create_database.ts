import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1715693575861 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('CREATE DATABASE IF NOT EXISTS WoodMaster')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('DROP DATABASE IF EXISTS WoodMaster')
    }

}
