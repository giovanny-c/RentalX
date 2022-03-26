"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarSpecificationController = void 0;

var _tsyringe = require("tsyringe");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

class CreateCarSpecificationController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      specifications_ids
    } = req.body;

    const createCarSpecificationUseCase = _tsyringe.container.resolve(_CreateCarSpecificationUseCase.CreateCarSpecificationUseCase);

    const car = await createCarSpecificationUseCase.execute({
      car_id: id,
      specifications_ids
    });
    return res.json(car);
  }

}

exports.CreateCarSpecificationController = CreateCarSpecificationController;