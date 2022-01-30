import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

//esse arquivo inicializa a parada toda


export default (): CreateCategoryController => {
    const categoriesRepository = new CategoriesRepository()
    const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
    const createCategoryController = new CreateCategoryController(createCategoryUseCase)

    return createCategoryController
}

