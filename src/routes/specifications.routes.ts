import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";


const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.use(ensureAuthenticated)
// usa u middleware de autenticaçao 
//antes de cada rota /specifications

specificationsRoutes.post("/", createSpecificationController.handle)

export { specificationsRoutes }