
import { Router } from "express"

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController"
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRental.Controller"
import { ListRentalsByUseController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"


const rentalRoutes = Router()


const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUseController = new ListRentalsByUseController()

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle)
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle)
rentalRoutes.get("/user", ensureAuthenticated, listRentalsByUseController.handle)


export { rentalRoutes }