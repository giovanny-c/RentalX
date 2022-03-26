"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarImages1645456415672 = void 0;

var _typeorm = require("typeorm");

class CreateCarImages1645456415672 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "cars_image",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "car_id",
        type: "uuid"
      }, {
        name: "image_name",
        type: "varchar"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }],
      foreignKeys: [{
        name: "FKCarImage",
        //nome
        referencedTableName: "cars",
        //tabela que ela faz referencia
        referencedColumnNames: ["id"],
        // coluna que ela faz referencia na tabela estrangeira   
        columnNames: ["car_id"],
        //coluna que vai fazer referencia nessa tabela(vai ter o valor da coluna car.id)
        onDelete: "SET NULL",
        //se sofrer deleção na tabela "pai" (estrangeira)
        onUpdate: "SET NULL" //se sofrer alteração na tabela "pai" (estrangeira)
        //car_id vai ser null

      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("cars_image");
  }

}

exports.CreateCarImages1645456415672 = CreateCarImages1645456415672;