import { AppError } from "@shared/errors/AppError"
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory"

import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

let createCategoryUseCase: CreateCategoryUseCase

describe("Create Category", () => {

    beforeEach(() => {

        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
    })

    it("Should be able to create a new category", async () => {

        const category = {
            name: "Category test",
            description: "Category description test"
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        })

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)



        expect(categoryCreated).toHaveProperty("id")
        //quando cria uma cat. o repositorio cria o id,
        //logo se id existir a cat. foi criada

    })

    it("Should not be able to create a new category with a name that already exists", async () => {

        expect(async () => {
            const category = {
                name: "Category test",
                description: "Category description test"
            }

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            })

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            })
        }).rejects.toBeInstanceOf(AppError)//para dar certo o erro tem que ser AppError

    })

})