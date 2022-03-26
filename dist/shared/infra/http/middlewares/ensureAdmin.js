"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdmin = ensureAdmin;

var _UsersRepository = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");

var _AppError = require("@shared/errors/AppError");

async function ensureAdmin(req, res, next) {
  const {
    id
  } = req.user;
  const usersRepository = new _UsersRepository.UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.is_admin) {
    throw new _AppError.AppError("User isn't admin");
  }

  return next();
}