"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategoryController = void 0;

var _tsyringe = require("tsyringe");

var _CreateCategoryUseCase = require("./CreateCategoryUseCase");

class CreateCategoryController {
  async handle(req, res) {
    //vai retornar um tipo response
    const {
      name,
      description
    } = req.body;

    const createCategoryUseCase = _tsyringe.container.resolve(_CreateCategoryUseCase.CreateCategoryUseCase); //esta injetando o useCase na variavel


    await createCategoryUseCase.execute({
      name,
      description
    });
    return res.status(201).send();
  }

}

exports.CreateCategoryController = CreateCategoryController;