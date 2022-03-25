"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const express_1 = require("express");
const CreateCategoryController_1 = require("../../../../modules/cars/useCases/createCategory/CreateCategoryController");
const ImportCategoryController_1 = require("../../../../modules/cars/useCases/importCategory/ImportCategoryController");
const ListCategoriesController_1 = require("../../../../modules/cars/useCases/listCategories/ListCategoriesController"); //importa o index.ts
const multer = require("multer");
const ensureAdmin_1 = require("../middlewares/ensureAdmin");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const upload = multer({
    dest: "./tmp" //destino dos arquivos passados
});
const categoriesRoutes = (0, express_1.Router)(); //para poder usar as rotas
exports.categoriesRoutes = categoriesRoutes;
//categoriesRoutes.use(ensureAuthenticated)
const createCategoryController = new CreateCategoryController_1.CreateCategoryController();
const importCategoryController = new ImportCategoryController_1.ImportCategoryController();
const listCategoryController = new ListCategoriesController_1.ListCategoriesController();
categoriesRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCategoryController.handle);
//o controller vai ser como um middleware, e o handle recebe o (req, res)
categoriesRoutes.get("/", listCategoryController.handle);
categoriesRoutes.post("/import", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, upload.single("file"), importCategoryController.handle);
