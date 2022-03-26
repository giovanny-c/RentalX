"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRentalsByUseController = void 0;

var _tsyringe = require("tsyringe");

var _ListRentalsByUserUseCase = require("./ListRentalsByUserUseCase");

class ListRentalsByUseController {
  async handle(req, res) {
    const {
      id: user_id
    } = req.user;

    const listRentalsByUseUseCase = _tsyringe.container.resolve(_ListRentalsByUserUseCase.ListRentalsByUseUseCase);

    const rentals = await listRentalsByUseUseCase.execute(user_id);
    return res.json(rentals);
  }

}

exports.ListRentalsByUseController = ListRentalsByUseController;