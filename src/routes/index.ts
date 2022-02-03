import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router()


router.use("/categories", categoriesRoutes) //usa as rotas de categoriesRoutes no path /categories
router.use("/specifications", specificationsRoutes)
router.use("/users", usersRoutes)
router.use(authenticateRoutes) //vai usar direto(/sessions)

export { router }