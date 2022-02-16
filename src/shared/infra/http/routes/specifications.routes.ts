import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";


const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

// specificationsRoutes.use(ensureAuthenticated)
// usa u middleware de autenticaçao 
//antes de cada rota /specifications

specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle)

export { specificationsRoutes }