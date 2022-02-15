import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterCarsRenameBrandColumn1644942645796 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("cars", "Brand", "brand")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("cars", "brand", "Brand")
    }

}
