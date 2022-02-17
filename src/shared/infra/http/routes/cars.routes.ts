import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsControler } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsControler = new ListAvailableCarsControler()
const createCarSpecificationController = new CreateCarSpecificationController()

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRoutes.get("/available", listAvailableCarsControler.handle)

carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)

export { carsRoutes }