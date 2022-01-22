import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";//importa o index.ts
import { importCategoryController } from "../modules/cars/useCases/importCategory";


import multer from "multer";

const upload = multer({
    dest: "./tmp"  //destino dos arquivos passados
})

const categoriesRoutes = Router() //para poder usar as rotas


categoriesRoutes.post("/", (req, res) => {
    return createCategoryController.handle(req, res) //

})

categoriesRoutes.get("/", (req, res) => {
    return listCategoriesController.handle(req, res)
})

categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
    return importCategoryController.handle(req, res)
})


export { categoriesRoutes }

