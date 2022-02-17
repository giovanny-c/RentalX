import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsControler } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsControler = new ListAvailableCarsControler

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRoutes.get("/available", listAvailableCarsControler.handle)

export { carsRoutes }