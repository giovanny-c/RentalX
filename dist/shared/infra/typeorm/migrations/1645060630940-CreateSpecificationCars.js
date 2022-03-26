"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationCars1645060630940 = void 0;

var _typeorm = require("typeorm");

class CreateSpecificationCars1645060630940 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "specifications_cars",
      columns: [{
        name: "car_id",
        type: "uuid"
      }, {
        name: "specification_id",
        type: "uuid"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
    await queryRunner.createForeignKey("specifications_cars", new _typeorm.TableForeignKey({
      name: "FKSpecificationCar",
      referencedTableName: "specifications",
      //referencía a tabela 
      referencedColumnNames: ["id"],
      // na coluna
      columnNames: ["specification_id"],
      //pela coluna
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
    await queryRunner.createForeignKey("specifications_cars", new _typeorm.TableForeignKey({
      name: "FKCarSpecificartion",
      referencedTableName: "cars",
      //referencía a tabela 
      referencedColumnNames: ["id"],
      // na coluna
      columnNames: ["car_id"],
      //pela coluna
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey("specifications_cars", "FKCarSpecificartion");
    await queryRunner.dropForeignKey("specifications_cars", "FKSpecificartionCar");
    await queryRunner.dropTable("specifications_cars");
  }

}

exports.CreateSpecificationCars1645060630940 = CreateSpecificationCars1645060630940;