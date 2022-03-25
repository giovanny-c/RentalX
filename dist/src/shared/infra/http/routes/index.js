"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const authenticate_routes_1 = require("./authenticate.routes");
const cars_routes_1 = require("./cars.routes");
const categories_routes_1 = require("./categories.routes");
const password_routes_1 = require("./password.routes");
const rental_routes_1 = require("./rental.routes");
const specifications_routes_1 = require("./specifications.routes");
const users_routes_1 = require("./users.routes");
const router = (0, express_1.Router)();
exports.router = router;
router.use("/categories", categories_routes_1.categoriesRoutes); //usa as rotas de categoriesRoutes no path /categories
router.use("/specifications", specifications_routes_1.specificationsRoutes);
router.use("/users", users_routes_1.usersRoutes);
router.use(authenticate_routes_1.authenticateRoutes); //vai usar direto(/sessions)
router.use("/cars", cars_routes_1.carsRoutes);
router.use("/rental", rental_routes_1.rentalRoutes);
router.use("/password", password_routes_1.passwordRoutes);
