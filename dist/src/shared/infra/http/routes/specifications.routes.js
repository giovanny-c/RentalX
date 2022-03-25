"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specificationsRoutes = void 0;
const express_1 = require("express");
const CreateSpecificationController_1 = require("../../../../modules/cars/useCases/createSpecification/CreateSpecificationController");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const ensureAdmin_1 = require("../middlewares/ensureAdmin");
const specificationsRoutes = (0, express_1.Router)();
exports.specificationsRoutes = specificationsRoutes;
const createSpecificationController = new CreateSpecificationController_1.CreateSpecificationController();
// specificationsRoutes.use(ensureAuthenticated)
// usa u middleware de autenticaçao 
//antes de cada rota /specifications
specificationsRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createSpecificationController.handle);
