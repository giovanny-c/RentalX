import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSpecificationCars1645060630940 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "specifications_cars",
                columns: [
                    {
                        name: "car_id",
                        type: "uuid"
                    },
                    {
                        name: "specification_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },

                ]
            })
        )

        await queryRunner.createForeignKey(
            "specifications_cars",
            new TableForeignKey({
                name: "FKSpecificationCar",
                referencedTableName: "specifications", //referencía a tabela 
                referencedColumnNames: ["id"],// na coluna
                columnNames: ["specification_id"],//pela coluna
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            })
        )

        await queryRunner.createForeignKey(
            "specifications_cars",
            new TableForeignKey({
                name: "FKCarSpecificartion",
                referencedTableName: "cars", //referencía a tabela 
                referencedColumnNames: ["id"],// na coluna
                columnNames: ["car_id"],//pela coluna
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("specifications_cars", "FKCarSpecificartion")

        await queryRunner.dropForeignKey("specifications_cars", "FKSpecificartionCar")

        await queryRunner.dropTable("specifications_cars")
    }

}
