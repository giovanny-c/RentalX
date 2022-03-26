"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepositoryImMemory = void 0;

var _Rental = require("@modules/rentals/infra/typeorm/entities/Rental");

class RentalsRepositoryImMemory {
  constructor() {
    this.rentals = [];
  }

  async findByUser(user_id) {
    return this.rentals.filter(rental => rental.user_id === user_id);
  }

  async findById(id) {
    return this.rentals.find(rental => rental.id === id);
  }

  async create({
    car_id,
    expected_return_date,
    user_id
  }) {
    const rental = new _Rental.Rental();
    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date()
    });
    this.rentals.push(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id) {
    return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date); //retorna um carro se nao houver nenhuma data final(nenhum aluguel)
  }

  async findOpenRentalByUser(user_id) {
    return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date); //retorna um user se nao houver aluguel
  }

}

exports.RentalsRepositoryImMemory = RentalsRepositoryImMemory;