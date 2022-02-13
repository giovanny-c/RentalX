import { Router } from "express";

import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController";//importa o index.ts


const multer = require("multer")

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const upload = multer({
    dest: "./tmp"  //destino dos arquivos passados
})

const categoriesRoutes = Router() //para poder usar as rotas

//categoriesRoutes.use(ensureAuthenticated)

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoryController = new ListCategoriesController()


categoriesRoutes.post("/", createCategoryController.handle)
//o controller vai ser como um middleware, e o handle recebe o (req, res)

categoriesRoutes.get("/", listCategoryController.handle)

categoriesRoutes.post("/import", upload.single("file"), importCategoryController.handle)


export { categoriesRoutes }

