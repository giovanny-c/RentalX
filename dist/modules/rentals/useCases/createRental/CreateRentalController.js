"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalController = void 0;

var _tsyringe = require("tsyringe");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

class CreateRentalController {
  async handle(req, res) {
    const {
      expected_return_date,
      car_id
    } = req.body;
    const {
      id: user_id
    } = req.user;

    const createRentalUseCase = _tsyringe.container.resolve(_CreateRentalUseCase.CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      expected_return_date,
      user_id
    });
    return res.status(201).json(rental);
  }

}

exports.CreateRentalController = CreateRentalController;