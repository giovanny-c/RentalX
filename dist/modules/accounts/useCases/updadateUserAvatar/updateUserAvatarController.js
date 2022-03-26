"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarController = void 0;

var _tsyringe = require("tsyringe");

var _UpdateUserAvatarUseCase = require("./UpdateUserAvatarUseCase");

class UpdateUserAvatarController {
  async handle(req, res) {
    const {
      id
    } = req.user; //pega o user passado pelo middleware
    //Receber arquivo

    const avatar_file = req.file.filename; // pega só o nome do arquivo pra por no banco

    const updateUserAvatarUseCase = _tsyringe.container.resolve(_UpdateUserAvatarUseCase.UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({
      user_id: id,
      avatar_file
    });
    return res.status(204).send();
  }

}

exports.UpdateUserAvatarController = UpdateUserAvatarController;