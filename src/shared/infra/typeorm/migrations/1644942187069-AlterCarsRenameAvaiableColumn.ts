import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterCarsrenameAvaiable1644942187069 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("cars", "avaiable", "available")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("cars", "available", "avaiable")
    }

}
