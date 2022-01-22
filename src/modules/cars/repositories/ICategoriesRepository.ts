import { Category } from "../model/Category"

//DTO = Data Transfer 
interface ICreateCategoryDTO { //interface de criação da categoria
    name: string
    description: string

}


interface ICategoriesRepository {

    findByName(name: string): Category

    list(): Category[]

    create({ name, description }: ICreateCategoryDTO): void

}

export { ICategoriesRepository, ICreateCategoryDTO }