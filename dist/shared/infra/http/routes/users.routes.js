"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRoutes = void 0;

var _express = require("express");

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

var _CreateUserController = require("../../../../modules/accounts/useCases/createUser/CreateUserController");

var _updateUserAvatarController = require("../../../../modules/accounts/useCases/updadateUserAvatar/updateUserAvatarController");

var _ProfileUserController = require("@modules/accounts/useCases/profileUserUseCase/ProfileUserController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const multer = require("multer");

const usersRoutes = (0, _express.Router)();
exports.usersRoutes = usersRoutes;
const uploadAvatar = multer(_upload.default); // passando a pasta, ver src/config/upload.ts

const createUserController = new _CreateUserController.CreateUserController();
const updateUserAvatarController = new _updateUserAvatarController.UpdateUserAvatarController();
const profileUserController = new _ProfileUserController.ProfileUserController();
usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/profile", _ensureAuthenticated.ensureAuthenticated, profileUserController.handle);
usersRoutes.patch("/avatar", _ensureAuthenticated.ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle); // vai salvar a file sobreescrevendo o nome dela, na pasta passada