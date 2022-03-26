"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("../entities/Car");

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Car.Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id
  }) {
    const car = this.repository.create({
      name,
      description,
      fine_amount,
      daily_rate,
      brand,
      category_id,
      license_plate,
      specifications,
      id
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    const car = await this.repository.findOne({
      license_plate
    });
    return car;
  }

  async findAvailable(brand, category_id, name) {
    const carsQuery = await this.repository.createQueryBuilder("c") // "c" = atalho para usar na busca
    .where("available = :available", {
      available: true
    }); // :available = atributo, {available = true} = setando valor do atributo
    //traz se tiver cars.available === true
    //retorar a categoria tbm

    if (brand) {
      //se existir um brand vai adicionar ele a query
      carsQuery.andWhere("c.brand = :brand", {
        brand
      });
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", {
        category_id
      });
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", {
        name
      });
    }

    const cars = await carsQuery.getMany(); //pega varios resultados

    return cars;
  }

  async findById(id) {
    const car = await this.repository.findOne(id);
    return car;
  }

  async updateAvailable(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where("id = :id", {
      id
    }).execute();
  }

}

exports.CarsRepository = CarsRepository;