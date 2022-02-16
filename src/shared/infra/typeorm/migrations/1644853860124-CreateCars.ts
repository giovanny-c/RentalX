import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCars1644853860124 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cars",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "daily_rate",
                        type: "numeric"
                    },
                    {
                        name: "available",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "license_plate",
                        type: "varchar"
                    },
                    {
                        name: "fine_amount",
                        type: "numeric"
                    },
                    {
                        name: "brand",
                        type: "varchar"
                    },
                    {
                        name: "category_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },

                ],

                foreignKeys: [
                    {
                        name: "FKCategoryCar", //nome
                        referencedTableName: "categories", //tabela que ela faz referencia
                        referencedColumnNames: ["id"], // coluna que ela faz referencia na tabela estrangeira   
                        columnNames: ["category_id"],   //coluna que vai fazer referencia nessa tabela(vai ter o valor da coluna categories.id)
                        onDelete: "SET NULL", //se sofrer deleção na tabela "pai" (estrangeira)
                        onUpdate: "SET NULL"  //se sofrer alteração na tabela "pai" (estrangeira)
                        //category_id vai ser null
                    }
                ]
            })
        )

    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cars")
    }

}
