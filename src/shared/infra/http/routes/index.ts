import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRoutes } from "./password.routes";
import { rentalRoutes } from "./rental.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";


const router = Router()


router.use("/categories", categoriesRoutes) //usa as rotas de categoriesRoutes no path /categories
router.use("/specifications", specificationsRoutes)
router.use("/users", usersRoutes)
router.use(authenticateRoutes) //vai usar direto(/sessions)
router.use("/cars", carsRoutes)
router.use("/rental", rentalRoutes)
router.use("/password", passwordRoutes)

export { router }