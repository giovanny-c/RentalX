"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvailableCarsControler = void 0;

var _tsyringe = require("tsyringe");

var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");

class ListAvailableCarsControler {
  async handle(req, res) {
    const {
      brand,
      name,
      category_id
    } = req.query;

    const listAvailableCarsUsecase = _tsyringe.container.resolve(_ListAvailableCarsUseCase.ListAvailableCarsUseCase);

    const cars = await listAvailableCarsUsecase.execute({
      brand: brand,
      //forçando os parametro como tipo string, pois o query params pode ter outro tipo de dados
      name: name,
      category_id: category_id
    });
    return res.json(cars);
  }

}

exports.ListAvailableCarsControler = ListAvailableCarsControler;