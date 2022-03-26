"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoriesRoutes = void 0;

var _express = require("express");

var _CreateCategoryController = require("../../../../modules/cars/useCases/createCategory/CreateCategoryController");

var _ImportCategoryController = require("../../../../modules/cars/useCases/importCategory/ImportCategoryController");

var _ListCategoriesController = require("../../../../modules/cars/useCases/listCategories/ListCategoriesController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

//importa o index.ts
const multer = require("multer");

const upload = multer({
  dest: "./tmp" //destino dos arquivos passados

});
const categoriesRoutes = (0, _express.Router)(); //para poder usar as rotas
//categoriesRoutes.use(ensureAuthenticated)

exports.categoriesRoutes = categoriesRoutes;
const createCategoryController = new _CreateCategoryController.CreateCategoryController();
const importCategoryController = new _ImportCategoryController.ImportCategoryController();
const listCategoryController = new _ListCategoriesController.ListCategoriesController();
categoriesRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCategoryController.handle); //o controller vai ser como um middleware, e o handle recebe o (req, res)

categoriesRoutes.get("/", listCategoryController.handle);
categoriesRoutes.post("/import", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, upload.single("file"), importCategoryController.handle);