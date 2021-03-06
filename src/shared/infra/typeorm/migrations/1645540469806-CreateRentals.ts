import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRentals1645540469806 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "rentals",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "car_id",
                        type: "uuid"
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "start_date",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "end_date",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "expected_return_date",
                        type: "timestamp"
                    },
                    {
                        name: "total",
                        type: "numeric",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }

                ],
                foreignKeys: [
                    {
                        name: "FKCarRental", //nome
                        referencedTableName: "cars", //tabela que ela faz referencia
                        referencedColumnNames: ["id"], // coluna que ela faz referencia na tabela estrangeira   
                        columnNames: ["car_id"],   //coluna que vai fazer referencia nessa tabela(vai ter o valor da coluna car.id)
                        onDelete: "SET NULL", //se sofrer dele????o na tabela "pai" (estrangeira)
                        onUpdate: "SET NULL"  //se sofrer altera????o na tabela "pai" (estrangeira)
                        //car_id vai ser null
                    },
                    {
                        name: "FKUserRental", //nome
                        referencedTableName: "users", //tabela que ela faz referencia
                        referencedColumnNames: ["id"], // coluna que ela faz referencia na tabela estrangeira   
                        columnNames: ["user_id"],   //coluna que vai fazer referencia nessa tabela(vai ter o valor da coluna car.id)
                        onDelete: "SET NULL", //se sofrer dele????o na tabela "pai" (estrangeira)
                        onUpdate: "SET NULL"  //se sofrer altera????o na tabela "pai" (estrangeira)
                        //car_id vai ser null
                    }

                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rentals")
    }


}
