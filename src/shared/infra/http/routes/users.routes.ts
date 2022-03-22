import { Router } from "express";

const multer = require("multer")

import uploadConfig from "../../../../config/upload";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updadateUserAvatar/updateUserAvatarController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUserUseCase/ProfileUserController";

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig) // passando a pasta, ver src/config/upload.ts


const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const profileUserController = new ProfileUserController()


usersRoutes.post("/", createUserController.handle)
usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle)

usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle)
// vai salvar a file sobreescrevendo o nome dela, na pasta passada 


export { usersRoutes }