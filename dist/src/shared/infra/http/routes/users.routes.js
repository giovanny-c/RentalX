"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = require("express");
const multer = require("multer");
const upload_1 = require("../../../../config/upload");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const CreateUserController_1 = require("../../../../modules/accounts/useCases/createUser/CreateUserController");
const updateUserAvatarController_1 = require("../../../../modules/accounts/useCases/updadateUserAvatar/updateUserAvatarController");
const ProfileUserController_1 = require("@modules/accounts/useCases/profileUserUseCase/ProfileUserController");
const usersRoutes = (0, express_1.Router)();
exports.usersRoutes = usersRoutes;
const uploadAvatar = multer(upload_1.default); // passando a pasta, ver src/config/upload.ts
const createUserController = new CreateUserController_1.CreateUserController();
const updateUserAvatarController = new updateUserAvatarController_1.UpdateUserAvatarController();
const profileUserController = new ProfileUserController_1.ProfileUserController();
usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/profile", ensureAuthenticated_1.ensureAuthenticated, profileUserController.handle);
usersRoutes.patch("/avatar", ensureAuthenticated_1.ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);
